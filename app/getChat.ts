'use server'
import { kv } from '@vercel/kv'
import { AnalysisPayload } from '@/lib/types'

export async function getChat(id: string, userId: string) {
  const chat = await kv.hgetall<AnalysisPayload>(`chat:${id}`)

  if (!chat || (userId && chat.userId !== userId)) {
    return null
  }

  return chat
}
