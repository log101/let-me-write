import { nanoid } from '@/lib/utils'
import { Chat } from '@/components/chat'
import { useTranslations } from 'next-intl'

export const runtime = 'edge'

export default function IndexPage() {
  const id = nanoid()

  const t = useTranslations('Home')

  return <Chat id={id} title={t('title')} />
}
