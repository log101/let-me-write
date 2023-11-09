import { nanoid } from '@/lib/utils'
import { Chat } from '@/components/chat'
import { NextIntlClientProvider, useLocale, useMessages } from 'next-intl'

export const runtime = 'edge'

export default function IndexPage() {
  const id = nanoid()
  const locale = useLocale()
  const messages = useMessages()

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Chat id={id} />
    </NextIntlClientProvider>
  )
}
