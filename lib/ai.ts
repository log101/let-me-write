import { OpenAI } from 'langchain/llms/openai'
import { StructuredOutputParser } from 'langchain/output_parsers'
import z from 'zod'
import { PromptTemplate } from 'langchain/prompts'

export interface Analysis extends Record<string, any> {
  id: string
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
    .describe(
      'Grammatical feedback as a score from 1 to 5 for the student who wrote the second part'
    ),
  grammer: z
    .string()
    .describe(
      'Grammatical feedback for the student who wrote the second part, must be at least 4-5 sentences'
    ),
  consistencyScore: z
    .number()
    .positive()
    .lte(5)
    .describe(
      'Feedback score from 1 to 5 for the consistency between part 1 and 2 for the student who wrote the second paragraph'
    ),
  consistency: z
    .string()
    .describe(
      'Feedback on the consistency between part 1 and 2 for the student who wrote the second paragraph, must be at least 4-5 sentences'
    ),
  styleScore: z
    .number()
    .positive()
    .lte(5)
    .describe(
      'Feedback score from 1 to 5 on the style for the student who wrote the second part'
    ),
  style: z
    .string()
    .describe(
      'Style feedback for the student who wrote the second part, must be at least 4-5 sentences'
    )
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
      "Analyse the part 1 and part 2, the first part are taken from an authentic author while the second is written by a high school student. You're going to give a feedback to the student so respond accordingly... Follow the instructions and format your response to match the format instructions, no matter what! \n{format_instructions}\nPart 1: {part1}\nPart 2: {part2}",
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
