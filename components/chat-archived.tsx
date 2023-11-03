'use client'

import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { AnalysisPayload } from '@/lib/types'

interface ChatProps extends React.ComponentProps<'div'> {
  analysisPayload: AnalysisPayload
}

export function ArchivedChat({ analysisPayload, className }: ChatProps) {
  const router = useRouter()
  const { analysis, textOriginal, textSupplied } = analysisPayload

  return (
    <div className="flex flex-col gap-4 pb-[200px] pt-4 md:gap-10 md:pt-10">
      {textOriginal && (
        <div className="mx-auto flex max-w-2xl flex-col gap-4 px-4">
          <div className="flex flex-col gap-4 rounded-lg border bg-background p-8">
            <h4 className="text-xl font-semibold">Original Text</h4>
            {textOriginal}
          </div>
        </div>
      )}
      {textSupplied && (
        <div className="mx-auto flex max-w-2xl flex-col gap-4 px-4">
          <div className="flex flex-col gap-4 rounded-lg border bg-background p-8">
            <h4 className="text-xl font-semibold">Text You Wrote</h4>
            {textSupplied}
          </div>
        </div>
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

          <Button
            onClick={e => {
              e.preventDefault()
              router.refresh()
              router.push('/')
            }}
            className="shrink bg-green-600 hover:bg-green-700 active:bg-green-800"
          >
            Go to Homepage
          </Button>
        </div>
      )}
    </div>
  )
}
