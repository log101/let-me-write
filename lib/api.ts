import { Analysis } from './ai'

const createURL = (path: string) => window.location.origin + path

export const analyseText = async ({
  id,
  part1,
  part2,
  title
}: {
  id: string
  part1: string
  part2: string
  title: string
}): Promise<{ data: { analysis: Analysis } }> => {
  const res = await fetch(
    new Request(createURL('/api/evaluate'), {
      method: 'POST',
      body: JSON.stringify({ id, part1, part2, title })
    })
  )

  if (res.ok) {
    return res.json()
  } else {
    throw new Error('Something went wrong on API server!')
  }
}
