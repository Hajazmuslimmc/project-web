import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AlSafe Browser | Private Browser and Search by Networkak',
  description: 'AlSafe Browser is a privacy-first browser and search experience by Networkak focused on anti-tracking, secure sessions, visual search results, and user control.',
  keywords: [
    'AlSafe Browser',
    'AlSafe',
    'private browser',
    'secure browser',
    'privacy search engine',
    'Networkak',
    'anti tracking browser',
    'ad blocker',
    'private search',
    'vpn browser',
    'private browsing',
    'secure search engine'
  ],
  authors: [{ name: 'Networkak Team', url: 'https://networkak.com' }],
  creator: 'Networkak',
  publisher: 'Networkak',
  applicationName: 'AlSafe Browser',
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
    title: 'AlSafe Browser | Privacy-First Browser and Search',
    description: 'Explore AlSafe Browser and the Networkak /Search experience built around anti-tracking, secure browsing, and user control.',
    url: 'https://networkak.com',
    siteName: 'AlSafe Browser',
    images: [
      {
        url: 'https://networkak.com/assets/favicon.png',
        width: 1200,
        height: 630,
        alt: 'AlSafe Browser by Networkak',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AlSafe Browser | Privacy-First Browser and Search',
    description: 'Modern secure browsing and private search by Networkak.',
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
    "@type": "SoftwareApplication",
    "name": "AlSafe Browser",
    "alternateName": "AlSafe",
    "description": "Privacy-first browser and search ecosystem focused on anti-tracking, secure sessions, visual search results, account sync, and user-controlled permissions.",
    "url": "https://networkak.com",
    "logo": "https://networkak.com/assets/favicon.png",
    "image": "https://networkak.com/assets/favicon.png",
    "sameAs": [
      "https://github.com/Hajazmuslimmc/project-web",
      "https://twitter.com/networkak",
      "https://discord.gg/networkak"
    ],
    "applicationCategory": "BrowserApplication",
    "operatingSystem": ["Web", "macOS", "Windows", "Linux", "Android", "iOS"],
    "offers": [
      {
        "@type": "Offer",
        "name": "AlSafe Free",
        "price": "0",
        "priceCurrency": "USD"
      },
      {
        "@type": "Offer",
        "name": "AlSafe+",
        "price": "9.99",
        "priceCurrency": "USD"
      }
    ],
    "serviceType": "Private Browser and Search Engine",
    "areaServed": "Worldwide",
    "keywords": "AlSafe Browser, private browser, secure browser, privacy search, anti tracking, ad blocker, private browsing, VPN browser"
  }

  return (
    <html lang="en">
      <head>
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}></script>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
                `,
              }}
            />
          </>
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
