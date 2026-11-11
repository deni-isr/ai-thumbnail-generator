# Viikko 4 - Tehtävä 2: YouTube Thumbnail Generator

Sovellus luo YouTube-videon aiheesta pikkukuvan (thumbnail) käyttäen OpenAI:n kuvagenerointimallia (`gpt-image-1.5`) Metropolian proxyn kautta ja tallentaa sen `.png`-tiedostona levylle.

## Järjestelmän prompti
`A vibrant, eye-catching YouTube thumbnail for a video about: "{text}". High contrast, cinematic lighting, modern digital art style, bold composition suitable for YouTube.`

---

### Testi 1
**Syöte:**

  "text": "Exploring deep space and black holes"

### Generoitu kuva:
![Kuva1](/ai-thumbnail-generator/thumbnail-1.png)

### Testi 2
**Syöte:**
{
  "text": "Node.js and TypeScript Crash Course"
}

### Generoitu kuva:
![Kuva1](/ai-thumbnail-generator/thumbnail-2.png)