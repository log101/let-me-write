import { OpenAI } from 'langchain/llms/openai'
import { StructuredOutputParser } from 'langchain/output_parsers'
import z from 'zod'
import { PromptTemplate } from 'langchain/prompts'

export interface Analysis {
  grammerScore: number
  grammer: string
  consistencyScore: number
  consistency: string
  styleScore: number
  style: string
}

const analysisSchema = z.object({
  grammerScore: z
    .number()
    .positive()
    .lte(5)
    .describe('Score of the grammatical analysis of the second part'),
  grammer: z.string().describe('Grammatical analysis of the second part'),
  consistencyScore: z
    .number()
    .positive()
    .lte(5)
    .describe(
      'Score of the analysis of whether the part 1 and part 2 are consistent'
    ),
  consistency: z
    .string()
    .describe('Analysis of whether the part 1 and part 2 are consistent'),
  styleScore: z
    .number()
    .positive()
    .lte(5)
    .describe('Score of the literary analysis of part 2'),
  style: z.string().describe('Literary analysis of part 2')
})

const parser = StructuredOutputParser.fromZodSchema(analysisSchema)

const getPrompt = async ({
  part1,
  part2
}: {
  part1: string
  part2: string
}) => {
  const format_instructions = parser.getFormatInstructions()

  const prompt = new PromptTemplate({
    template:
      "Analyse the part 1 and part 2, the first part are taken from an authentic author while the second is written by a high school student. You're going to give a feedback to the student so respond accordingly... Follow the instructions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{part1}\n{part2}",
    inputVariables: ['part1', 'part2'],
    partialVariables: { format_instructions }
  })

  const input = await prompt.format({
    part1,
    part2
  })

  return input
}

export const analyze = async ({
  part1,
  part2
}: {
  part1: string
  part2: string
}) => {
  const input = await getPrompt({ part1, part2 })
  const model = new OpenAI({ temperature: 0.5, modelName: 'gpt-3.5-turbo' })
  const result = await model.call(input)

  try {
    return parser.parse(result)
  } catch (e) {
    console.log(e)
  }
}
