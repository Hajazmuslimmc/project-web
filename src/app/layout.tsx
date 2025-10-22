import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import GoogleTagManager from '@/components/GoogleTagManager'
import StructuredData from '@/components/StructuredData'
import { AuthProvider } from '@/contexts/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'NetworkAK - Premium Web Gaming Experience',
    template: '%s | NetworkAK'
  },
  description: 'Discover and play the best web games on NetworkAK. From action-packed adventures to brain-teasing puzzles, we bring you the ultimate gaming experience.',
  keywords: [
    'web games',
    'online games', 
    'browser games',
    'gaming',
    'NetworkAK',
    'free games',
    'arcade games',
    'puzzle games',
    'action games',
    'multiplayer games'
  ],
  authors: [{ name: 'NetworkAK Team' }],
  creator: 'NetworkAK',
  publisher: 'NetworkAK',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://networkak.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://networkak.com',
    title: 'NetworkAK - Premium Web Gaming Experience',
    description: 'Discover and play the best web games on NetworkAK. From action-packed adventures to brain-teasing puzzles, we bring you the ultimate gaming experience.',
    siteName: 'NetworkAK',
    images: [
      {
        url: '/android-chrome-512x512.png',
        width: 512,
        height: 512,
        alt: 'NetworkAK Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NetworkAK - Premium Web Gaming Experience',
    description: 'Discover and play the best web games on NetworkAK. From action-packed adventures to brain-teasing puzzles, we bring you the ultimate gaming experience.',
    images: ['/android-chrome-512x512.png'],
    creator: '@networkak',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png', sizes: 'any' }
    ]
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a1a' }
  ],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  category: 'gaming',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || 'G-WBCSXY8M1R'

  return (
    <html lang="en">
      <head>
        <StructuredData />
      </head>
      <body className={inter.className}>
        <GoogleTagManager gtmId={gtmId} />
        <AuthProvider>
          <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
