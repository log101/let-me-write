'use client'

import { useChat, type Message } from 'ai/react'

import { cn } from '@/lib/utils'
import { ChatList } from '@/components/chat-list'
import { ChatPanel } from '@/components/chat-panel'
import { TextSelector } from './text-selector'
import { ChatScrollAnchor } from '@/components/chat-scroll-anchor'
import { useLocalStorage } from '@/lib/hooks/use-local-storage'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Text } from '@/lib/consts'
import UnderlinedTextArea from './underlined-textarea'
import { analyseText } from '@/lib/api'
import { Analysis } from '@/lib/ai'

const IS_PREVIEW = process.env.VERCEL_ENV === 'preview'
export interface ChatProps extends React.ComponentProps<'div'> {
  initialMessages?: Message[]
  id?: string
}

export function Chat({ id, initialMessages, className }: ChatProps) {
  const [previewToken, setPreviewToken] = useLocalStorage<string | null>(
    'ai-token',
    null
  )
  const [previewTokenDialog, setPreviewTokenDialog] = useState(IS_PREVIEW)
  const [previewTokenInput, setPreviewTokenInput] = useState(previewToken ?? '')
  const [text, setText] = useState<Text>()
  const [analysis, setAnalysis] = useState<Analysis>()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (providedText: string) => {
    setLoading(true)

    if (text) {
      const res = await analyseText({ part1: text?.text, part2: providedText })
      setAnalysis(res.data.analysis)
    } else {
      console.error('Please select a text!')
    }

    setLoading(false)
  }

  const resetAnalysis = () => {
    setAnalysis(undefined)
  }

  return (
    <>
      <div className={cn('pb-[200px] pt-4 md:pt-10', className)}>
        <div className="mb-4">
          <TextSelector {...{ text, setText, resetAnalysis }} />
        </div>

        {text && (
          <UnderlinedTextArea
            handleSubmit={handleSubmit}
            loading={loading}
            firstTry={!analysis}
          />
        )}

        {analysis && (
          <div className="mx-auto mb-4 flex max-w-2xl flex-col gap-4 px-4">
            <div className="flex flex-col gap-4 rounded-lg border bg-background p-8">
              <h4 className="text-xl font-semibold">Analysis 💫</h4>
              <div>
                <p className="text-lg font-semibold">
                  Consistency: {analysis.consistencyScore}/5
                </p>
                {analysis.consistency}
              </div>
              <div>
                <p className="text-lg font-semibold">
                  Grammer: {analysis.grammerScore}/5
                </p>
                {analysis.grammer}
              </div>
              <div>
                <p className="text-lg font-semibold">
                  Style: {analysis.styleScore}/5
                </p>
                {analysis.style}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* <ChatPanel
        id={id}
        isLoading={isLoading}
        stop={stop}
        append={append}
        reload={reload}
        messages={messages}
        input={input}
        setInput={setInput}
      /> */}

      <Dialog open={previewTokenDialog} onOpenChange={setPreviewTokenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter your OpenAI Key</DialogTitle>
            <DialogDescription>
              If you have not obtained your OpenAI API key, you can do so by{' '}
              <a
                href="https://platform.openai.com/signup/"
                className="underline"
              >
                signing up
              </a>{' '}
              on the OpenAI website. This is only necessary for preview
              environments so that the open source community can test the app.
              The token will be saved to your browser&apos;s local storage under
              the name <code className="font-mono">ai-token</code>.
            </DialogDescription>
          </DialogHeader>
          <Input
            value={previewTokenInput}
            placeholder="OpenAI API key"
            onChange={e => setPreviewTokenInput(e.target.value)}
          />
          <DialogFooter className="items-center">
            <Button
              onClick={() => {
                setPreviewToken(previewTokenInput)
                setPreviewTokenDialog(false)
              }}
            >
              Save Token
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
