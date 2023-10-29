'use client'

import React, { useState } from 'react'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { ReloadIcon } from '@radix-ui/react-icons'

const UnderlinedTextArea = ({
  handleSubmit,
  loading
}: {
  handleSubmit: (text: string) => void
  loading: boolean
}) => {
  const [input, setInput] = useState('')

  return (
    <>
      <div className="mx-auto mb-4 flex max-w-2xl flex-col gap-4 px-4">
        <div className="rounded-lg border bg-background p-8">
          <p className="font-semibold">
            Now it&apos;s your turn to write! How would continue this paragraph
            if you were the writer? Type it below.
          </p>
        </div>
      </div>

      <div className="mx-auto mb-4 flex max-w-2xl flex-col gap-4 px-4">
        <div className="flex flex-col justify-end gap-3 rounded-lg border bg-background p-8">
          <Textarea
            rows={6}
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Complete the text above."
            spellCheck={false}
          />
          <Button
            disabled={loading}
            className="shrink bg-green-600 hover:bg-green-700 active:bg-green-800"
            onClick={() => handleSubmit(input)}
          >
            {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            Evaluate
          </Button>
        </div>
      </div>
    </>
  )
}

export default UnderlinedTextArea
