import React from 'react'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'

const UnderlinedTextArea = () => {
  return (
    <>
      <div className="mx-auto mb-4 flex max-w-2xl flex-col gap-4 px-4">
        <div className="rounded-lg border bg-background p-8">
          <p className="font-semibold">
            Now it&apos;s your turn to write! How would continue this paragraph
            if you were to writer? Type it below.
          </p>
        </div>
      </div>

      <div className="mx-auto flex max-w-2xl flex-col gap-4 px-4">
        <div className="flex flex-col justify-end gap-3 rounded-lg border bg-background p-8">
          <Textarea rows={6} />
          <Button className="shrink bg-green-600 hover:bg-green-700 active:bg-green-800">
            Evaluate
          </Button>
        </div>
      </div>
    </>
  )
}

export default UnderlinedTextArea
