import { Analysis } from './ai'

const createURL = (path: string) => window.location.origin + path

export const analyseText = async ({
  part1,
  part2
}: {
  part1: string
  part2: string
}): Promise<{ data: { analysis: Analysis } }> => {
  const res = await fetch(
    new Request(createURL('/api/evaluate'), {
      method: 'POST',
      body: JSON.stringify({ part1, part2 })
    })
  )

  if (res.ok) {
    return res.json()
  } else {
    throw new Error('Something went wrong on API server!')
  }
}
