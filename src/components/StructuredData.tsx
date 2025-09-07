export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "NetworkAK",
    "alternateName": "NetworkAK - Premium Web Gaming Experience",
    "url": "https://networkak.com",
    "description": "Discover and play the best web games on NetworkAK. From action-packed adventures to brain-teasing puzzles, we bring you the ultimate gaming experience.",
    "publisher": {
      "@type": "Organization",
      "name": "NetworkAK",
      "url": "https://networkak.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://networkak.com/favicon_io/android-chrome-512x512.png",
        "width": 512,
        "height": 512
      }
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://networkak.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "mainEntity": {
      "@type": "ItemList",
      "name": "Web Games Collection",
      "description": "Collection of premium web games",
      "numberOfItems": "10+",
      "itemListElement": [
        {
          "@type": "Game",
          "name": "Snake Game",
          "description": "Classic snake game with modern graphics",
          "url": "https://networkak.com/snake",
          "genre": "Arcade",
          "gamePlatform": "Web Browser"
        }
      ]
    },
    "sameAs": [
      "https://twitter.com/networkak",
      "https://facebook.com/networkak"
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
