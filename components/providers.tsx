'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ThemeProviderProps } from 'next-themes/dist/types'

import { TooltipProvider } from '@/components/ui/tooltip'
import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl'

export function Providers({
  children,
  locale,
  messages,
  ...props
}: ThemeProviderProps & {
  locale: string | undefined
  messages: AbstractIntlMessages | undefined
}) {
  return (
    <NextThemesProvider {...props}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <TooltipProvider>{children}</TooltipProvider>
      </NextIntlClientProvider>
    </NextThemesProvider>
  )
}
