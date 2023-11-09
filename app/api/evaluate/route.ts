import { kv } from '@vercel/kv'
import { auth } from '@clerk/nextjs'
import { analyze } from '@/lib/ai'
import { NextResponse } from 'next/server'
import { AnalysisPayload } from '@/lib/types'

export const runtime = 'edge'

export async function POST(req: Request) {
  const json = await req.json()

  const { id, part1, part2, title } = json
  const userId = auth()?.userId
  const createdAt = Date.now()

  if (!userId) {
    return new Response('Unauthorized', {
      status: 401
    })
  }

  const res = await analyze({ part1, part2 })

  const path = `/chat/${id}`

  if (!res) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  } else {
    const payload: AnalysisPayload = {
      id,
      title,
      userId,
      createdAt,
      textOriginal: part1,
      textSupplied: part2,
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
}
