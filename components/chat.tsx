'use client'

import { type Message } from 'ai/react'

import { cn } from '@/lib/utils'
import { TextSelector } from './text-selector'
import { useState } from 'react'
import { Text } from '@/lib/consts'
import UserTextInputArea from './underlined-textarea'
import { analyseText } from '@/lib/api'
import { Analysis } from '@/lib/ai'
import toast from 'react-hot-toast'
import HeroDescription from './hero-description'
import TextInputDescription from './text-input-description'
import { useTranslations } from 'next-intl'

export interface ChatProps extends React.ComponentProps<'div'> {
  initialMessages?: Message[]
  id: string
}

export function Chat({ id, className }: ChatProps) {
  const [text, setText] = useState<Text>()
  const [analysis, setAnalysis] = useState<Analysis>()
  const [loading, setLoading] = useState(false)
  const t = useTranslations('Home')

  const handleSubmit = async (providedText: string) => {
    setLoading(true)

    if (text) {
      try {
        const res = await analyseText({
          id,
          part1: text?.text,
          part2: providedText,
          title: text.title
        })
        setAnalysis(res.data.analysis)
      } catch (e) {
        toast.error(t('evaluateError'))
        setLoading(false)
      }
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
          <div className="mx-auto flex max-w-2xl flex-col gap-4 px-4">
            <HeroDescription />
            <TextSelector {...{ text, setText, resetAnalysis }} />
          </div>
        </div>

        {text && (
          <UserTextInputArea
            handleSubmit={handleSubmit}
            loading={loading}
            firstTry={!analysis}
            resetAnalysis={resetAnalysis}
          />
        )}

        {analysis && (
          <div className="mx-auto mb-4 flex max-w-2xl flex-col gap-4 px-4">
            <div className="flex flex-col gap-4 rounded-lg border bg-background p-8">
              <h4 className="text-xl font-semibold">{t('reviewTitle')}</h4>
              <div>
                <p className="text-lg font-semibold">
                  {t('consistency')}: {analysis.consistencyScore}/5
                </p>
                {analysis.consistency}
              </div>
              <div>
                <p className="text-lg font-semibold">
                  {t('grammer')}: {analysis.grammerScore}/5
                </p>
                {analysis.grammer}
              </div>
              <div>
                <p className="text-lg font-semibold">
                  {t('style')}: {analysis.styleScore}/5
                </p>
                {analysis.style}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
