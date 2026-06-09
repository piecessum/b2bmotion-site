import type { Metadata } from 'next'
import { Outfit, DM_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { DemoFormDialog } from '@/components/demo-form-dialog'
import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_TITLE,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  ALLOW_INDEXING,
} from '@/lib/site'
import './globals.css'

const outfit = Outfit({ 
  subsets: ["latin", "cyrillic"],
  variable: '--font-outfit',
  weight: ['400', '500', '600', '700'],
})

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  variable: '--font-dm-sans',
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // Без title.template: страницы уже задают полные заголовки с брендом,
  // а разделы формируют их через pageMetadata() в lib/site.ts.
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  generator: 'v0.app',
  alternates: {
    canonical: '/',
  },
  // На тестовом домене сайт закрыт от индексации (см. lib/site.ts).
  // После переезда NEXT_PUBLIC_ALLOW_INDEXING=true откроет индексацию.
  robots: ALLOW_INDEXING
    ? {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
      }
    : { index: false, follow: false },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: SITE_NAME,
    url: SITE_URL,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [{ url: DEFAULT_OG_IMAGE, width: 1680, height: 720, alt: SITE_NAME }],
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
  icons: {
    icon: [
      {
        url: '/icons/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icons/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

// Структурированные данные организации (JSON-LD) для rich-результатов в поиске
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  alternateName: 'B2B Motion',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.svg`,
  email: 'info@b2bmotion.ru',
  description: DEFAULT_DESCRIPTION,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${outfit.variable} ${dmSans.variable} font-body antialiased bg-page text-heading`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
          <DemoFormDialog />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
