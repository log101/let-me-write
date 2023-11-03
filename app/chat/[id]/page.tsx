import { type Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

import { auth } from '@clerk/nextjs'
import { getChat } from '@/app/actions'
import { ArchivedChat } from '@/components/chat-archived'

export const runtime = 'edge'
export const preferredRegion = 'home'

export interface ChatPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({
  params
}: ChatPageProps): Promise<Metadata> {
  const session = auth()

  if (!session?.userId) {
    return {}
  }

  const chat = await getChat(params.id, session.userId)
  return {
    title: chat?.title.toString().slice(0, 50) ?? 'Chat'
  }
}

export default async function ChatPage({ params }: ChatPageProps) {
  const session = auth()

  if (!session?.userId) {
    redirect(`/sign-in?next=/chat/${params.id}`)
  }

  const analysis = await getChat(params.id, session.userId)

  if (!analysis) {
    notFound()
  }

  if (analysis?.userId !== session?.userId) {
    notFound()
  }

  return <ArchivedChat analysisPayload={analysis} />
}
