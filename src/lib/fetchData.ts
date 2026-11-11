import {ErrorResponse} from '../types/MessageTypes';

const fetchData = async <T>(
  url: string,
  options: RequestInit = {},
): Promise<T> => {
  const response = await fetch(url, options);
  if (!response.ok) {
    const errorText = await response.text();
    console.error('OpenAI API Error details:', errorText);
    throw new Error(`Error ${response.status} occured: ${errorText}`);
  }
  const json = await response.json();
  return json;
};

export default fetchData;
