import { type Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

import { auth } from '@clerk/nextjs'
import { getChat } from '@/app/actions'
import { ArchivedChat } from '@/components/chat-archived'

export const runtime = 'edge'
export const preferredRegion = 'home'

export interface SharePageProps {
  params: {
    id: string
  }
}

export default async function SharePage({ params }: SharePageProps) {
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
