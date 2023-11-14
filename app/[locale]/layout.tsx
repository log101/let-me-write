import { Metadata } from 'next'

import { Toaster } from 'react-hot-toast'

import '@/app/[locale]/globals.css'
import { fontMono, fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { Providers } from '@/components/providers'
import { Header } from '@/components/header'
import { ClerkProvider } from '@clerk/nextjs'
import { trTR } from '@clerk/localizations'

import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.BASE_URL ?? 'http://localhost:3000'),
  title: {
    default: 'Let Me Write',
    template: `%s - Let Me Write`
  },
  description: 'Its your turn to write!',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png'
  }
}

const locales = ['en', 'tr']

interface RootLayoutProps {
  children: React.ReactNode
  params: {
    locale: string
  }
}

export default async function RootLayout({
  children,
  params: { locale }
}: RootLayoutProps) {
  if (!locales.includes(locale as any)) notFound()

  let clerkLocal
  switch (locale) {
    case 'tr':
      clerkLocal = trTR
      break
    default:
      break
  }

  let messages
  try {
    messages = (await import(`../../messages/${locale}.json`)).default
  } catch (error) {
    notFound()
  }

  return (
    <ClerkProvider localization={clerkLocal}>
      <html lang={locale} suppressHydrationWarning>
        <head />
        <body
          className={cn(
            'font-sans antialiased',
            fontSans.variable,
            fontMono.variable
          )}
        >
          <Toaster />
          <Providers
            attribute="class"
            defaultTheme="system"
            enableSystem
            locale={locale}
            messages={messages}
          >
            <div className="flex min-h-screen flex-col">
              {/* @ts-ignore */}
              <Header />
              <main className="flex flex-1 flex-col bg-muted/50">
                {children}
              </main>
            </div>
            <TailwindIndicator />
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  )
}
