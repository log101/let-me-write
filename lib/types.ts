import { type Message } from 'ai'
import { Analysis } from './ai'

export interface Chat extends Record<string, any> {
  id: string
  title: string
  createdAt: Date
  userId: string
  path: string
  messages: Message[]
  sharePath?: string
}

export type ServerActionResult<Result> = Promise<
  | Result
  | {
      error: string
    }
>

export interface AnalysisPayload extends Record<string, any> {
  id: string
  title: string
  userId: string
  createdAt: number
  path: string
  analysis: Analysis
}
