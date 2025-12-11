import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Networkak Tools - Free Online Tools & Utilities Directory',
  description: 'Discover powerful free online tools and utilities built by Networkak. From productivity apps like Better Notes to development tools, design utilities, and AI-powered solutions.',
  keywords: [
    'Networkak',
    'free online tools',
    'web utilities',
    'Better Notes',
    'productivity tools',
    'development tools',
    'design utilities',
    'code formatter',
    'image optimizer',
    'password generator',
    'color palette',
    'JSON validator',
    'AI tools',
    'web apps'
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
    title: 'Networkak Tools - Free Online Tools & Utilities',
    description: 'Discover powerful free online tools and utilities. From Better Notes to development tools, design utilities, and AI-powered solutions.',
    url: 'https://your-domain.com',
    siteName: 'Networkak Tools',
    images: [
      {
        url: '/favicon.png',
        width: 1200,
        height: 630,
        alt: 'Networkak Tools - Free Online Tools Directory',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Networkak Tools - Free Online Tools & Utilities',
    description: 'Discover powerful free online tools and utilities. From Better Notes to development tools and AI-powered solutions.',
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
    "name": "Networkak Tools",
    "description": "Free online tools and utilities directory. Powerful web-based tools for productivity, development, design, and more.",
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
        "operatingSystem": ["Web", "macOS", "Windows", "Linux", "Android", "iOS"],
        "applicationCategory": "ProductivityApplication",
        "price": "0",
        "priceCurrency": "USD"
      }
    ],
    "serviceType": "Online Tools & Web Utilities",
    "areaServed": "Worldwide",
    "keywords": "free online tools, web utilities, productivity tools, development tools, design utilities, Better Notes, code formatter, image optimizer"
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
