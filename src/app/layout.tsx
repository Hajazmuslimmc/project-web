import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Networkak.com - Premium Web Gaming Platform & Free Online Tools',
  description: 'Networkak.com - Your ultimate destination for premium web games and powerful free online tools. Play instantly, no downloads required. Built by Networkak Team.',
  keywords: [
    'Networkak',
    'Networkak.com',
    'networkak',
    'web games',
    'online games',
    'premium gaming platform',
    'free online tools',
    'web utilities',
    'Better Notes',
    'productivity tools',
    'development tools',
    'AI tools',
    'instant play games',
    'browser games',
    'multiplayer games',
    'gaming platform'
  ],
  authors: [{ name: 'Networkak Team', url: 'https://networkak.com' }],
  creator: 'Networkak',
  publisher: 'Networkak',
  applicationName: 'Networkak',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://networkak.com'),
  alternates: {
    canonical: 'https://networkak.com',
  },
  openGraph: {
    title: 'Networkak.com - Premium Web Gaming Platform & Free Tools',
    description: 'Experience the future of web gaming with Networkak.com. Premium games, powerful tools, instant play - no downloads required.',
    url: 'https://networkak.com',
    siteName: 'Networkak',
    images: [
      {
        url: 'https://networkak.com/assets/favicon.png',
        width: 1200,
        height: 630,
        alt: 'Networkak.com - Premium Web Gaming Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Networkak.com - Premium Web Gaming & Tools',
    description: 'Experience premium web gaming and powerful free tools at Networkak.com. Play instantly, create effortlessly.',
    images: ['https://networkak.com/assets/favicon.png'],
    creator: '@networkak',
    site: '@networkak',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/assets/favicon.png',
    shortcut: '/assets/favicon.png',
    apple: '/assets/favicon.png',
  },
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Networkak",
    "alternateName": "Networkak.com",
    "description": "Premium web gaming platform and free online tools directory. Experience the future of web gaming with stunning graphics, smooth animations, and powerful utilities.",
    "url": "https://networkak.com",
    "logo": "https://networkak.com/assets/favicon.png",
    "image": "https://networkak.com/assets/favicon.png",
    "sameAs": [
      "https://github.com/Hajazmuslimmc/project-web",
      "https://twitter.com/networkak",
      "https://discord.gg/networkak"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "contact@networkak.com",
      "contactType": "customer service"
    },
    "offers": [
      {
        "@type": "SoftwareApplication",
        "name": "Networkak Gaming Platform",
        "description": "Premium web gaming platform with instant play games",
        "operatingSystem": ["Web", "macOS", "Windows", "Linux", "Android", "iOS"],
        "applicationCategory": "GameApplication",
        "price": "0",
        "priceCurrency": "USD"
      },
      {
        "@type": "SoftwareApplication",
        "name": "Better Notes",
        "description": "Cross-platform note-taking tool for all devices",
        "operatingSystem": ["Web", "macOS", "Windows", "Linux", "Android", "iOS"],
        "applicationCategory": "ProductivityApplication",
        "price": "0",
        "priceCurrency": "USD"
      }
    ],
    "serviceType": "Web Gaming Platform & Online Tools",
    "areaServed": "Worldwide",
    "keywords": "Networkak, Networkak.com, web games, online games, premium gaming, free online tools, web utilities, instant play, browser games, multiplayer games"
  }

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
