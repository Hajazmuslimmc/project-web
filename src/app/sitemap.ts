import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://networkak.com'
  
  // Main pages
  const routes = [
    '',
    '/betternotes',
    '/car-race-game',
    '/bloxed-io', 
    '/minecraft-game',
    '/icecut',
    '/code-formatter',
    '/image-optimizer',
    '/password-generator',
    '/color-palette',
    '/ai-summarizer',
    '/url-shortener',
    '/json-validator',
    '/qr-generator',
    '/ai-noise-remover',
    '/audio-enhancer',
    '/video-upscaler',
    '/photo-fixer',
    '/ai-code-generator',
    '/citation-generator',
    '/math-solver',
    '/flashcard-creator',
    '/meme-generator',
    '/invoice-generator',
    '/ip-checker',
    '/pdf-to-png'
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : 0.8,
  }))
}