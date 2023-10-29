import { kv } from '@vercel/kv'
import { auth } from '@/auth'
import { analyze } from '@/lib/ai'
import { NextResponse } from 'next/server'
import { nanoid } from '@/lib/utils'

export const runtime = 'edge'

export async function POST(req: Request) {
  const json = await req.json()

  const { part1, part2, title } = json
  const userId = (await auth())?.user.id
  const createdAt = Date.now()

  if (!userId) {
    return new Response('Unauthorized', {
      status: 401
    })
  }

  const res = await analyze({ part1, part2 })

  const id = json.id ?? nanoid()
  const path = `/chat/${id}`

  const payload = {
    id,
    title,
    userId,
    createdAt,
    path,
    analysis: res
  }

  await kv.hmset(`chat:${id}`, payload)
  await kv.zadd(`user:chat:${userId}`, {
    score: createdAt,
    member: `chat:${id}`
  })

  return NextResponse.json({ data: { analysis: res } })
}
