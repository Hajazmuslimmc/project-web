import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Networkak - The Best Network for Apps, Custom Tools, Media, Free & Paid Content',
  description: 'Networkak is the best network offering all apps, custom tools, media content, free and paid stuff. Download Better Notes - cross-platform note-taking tool. MCTiers ranking system.',
  keywords: [
    'Networkak',
    'Better Notes',
    'BetterNotes Networkak',
    'McNetTiers',
    'cross-platform apps',
    'custom tools',
    'media content',
    'free apps',
    'paid tools',
    'note taking app',
    'Minecraft ranking',
    'PvP tiers',
    'gaming network'
  ],
  authors: [{ name: 'Networkak Team' }],
  creator: 'Networkak',
  publisher: 'Networkak',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://your-domain.com'), // Replace with your actual domain
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Networkak - The Best Network for Apps & Tools',
    description: 'Discover Networkak - the ultimate network for apps, custom tools, media content, and more. Download Better Notes and explore MCTiers ranking system.',
    url: 'https://your-domain.com',
    siteName: 'Networkak',
    images: [
      {
        url: '/favicon.png',
        width: 1200,
        height: 630,
        alt: 'Networkak - Best Network for Apps and Tools',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Networkak - The Best Network for Apps & Tools',
    description: 'Networkak offers the best apps, custom tools, media content, free and paid stuff. Download Better Notes today!',
    images: ['/favicon.png'],
    creator: '@networkak',
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
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
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
    "description": "The best network for apps, custom tools, media content, free and paid stuff. Cross-platform note-taking with Better Notes.",
    "url": "https://your-domain.com",
    "logo": "https://your-domain.com/favicon.png",
    "sameAs": [
      "https://github.com/Hajazmuslimmc/project-web"
    ],
    "offers": [
      {
        "@type": "SoftwareApplication",
        "name": "Better Notes",
        "description": "Cross-platform note-taking tool for all devices",
        "operatingSystem": ["macOS", "Windows", "Linux", "Android", "iOS"],
        "applicationCategory": "ProductivityApplication"
      }
    ],
    "serviceType": "Software Development & Gaming Network",
    "areaServed": "Worldwide",
    "keywords": "Networkak, Better Notes, BetterNotes Networkak, McNetTiers, apps, custom tools, media, free content, paid tools"
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
