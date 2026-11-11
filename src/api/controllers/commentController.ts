import {Request, Response, NextFunction} from 'express';
import fs from 'fs';
import path from 'path';
import fetchData from '../../lib/fetchData';
import CustomError from '../../classes/CustomError';

const commentPost = async (
  req: Request<{}, {}, {text: string}>,
  res: Response<{response: string; fileName: string}>,
  next: NextFunction,
) => {
  try {
    const {text} = req.body;

    if (!text) {
      next(new CustomError('Video topic (text) is required', 400));
      return;
    }

    if (!process.env.OPENAI_API_URL) {
      next(
        new CustomError(
          'OPENAI_API_URL is missing in environment variables',
          500,
        ),
      );
      return;
    }

    const apiUrl = `${process.env.OPENAI_API_URL.replace(/\/$/, '')}/v1/images/generations`;

    const prompt = `A vibrant, eye-catching YouTube thumbnail for a video about: "${text}". High contrast, cinematic lighting, modern digital art style, bold composition suitable for YouTube.`;

    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-image-1.5',
        prompt: prompt,
        n: 1,
        size: '1024x1024',
      }),
    };

    const result = await fetchData<any>(apiUrl, options);
    const item = result.data?.[0];

    // Извлекаем base64 строку из ответа
    const base64Data: string | undefined =
      item?.b64_json ||
      item?.image ||
      Object.values(item || {}).find(
        (val): val is string => typeof val === 'string' && val.length > 500,
      );

    if (!base64Data) {
      next(new CustomError('Failed to parse generated image data', 500));
      return;
    }

    // Сохраняем PNG файл на диск в корень проекта
    const buffer = Buffer.from(base64Data, 'base64');
    const fileName = `thumbnail-${Date.now()}.png`;
    const filePath = path.join(process.cwd(), fileName);
    await fs.promises.writeFile(filePath, buffer);

    res.json({
      response: `Thumbnail generated successfully for: ${text}`,
      fileName,
    });
  } catch (error) {
    next(error);
  }
};

export {commentPost};