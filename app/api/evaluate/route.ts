import { auth } from '@/auth'
import { analyze } from '@/lib/ai'
import { NextResponse } from 'next/server'

export const runtime = 'edge'

export async function POST(req: Request) {
  const json = await req.json()
  const { part1, part2 } = json
  const userId = (await auth())?.user.id

  if (!userId) {
    return new Response('Unauthorized', {
      status: 401
    })
  }

  const res = await analyze({ part1, part2 })

  return NextResponse.json({ data: { analysis: res } })
}
