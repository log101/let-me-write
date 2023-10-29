'use client'

import React, { Dispatch, SetStateAction, useState } from 'react'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { ReloadIcon } from '@radix-ui/react-icons'
import z from 'zod'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form'
import { zodResolver } from '@hookform/resolvers/zod'

const FormSchema = z.object({
  secondPart: z
    .string()
    .min(50, {
      message: 'Your paragraph must be at least 50 characters.'
    })
    .max(300, {
      message: 'Your paragraph must not be longer than 300 characters.'
    })
})

const UnderlinedTextArea = ({
  handleSubmit,
  loading,
  firstTry
}: {
  handleSubmit: (text: string) => void
  loading: boolean
  firstTry: boolean
}) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  })

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
        <div className="justify-end rounded-lg border bg-background p-8">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(({ secondPart }) =>
                handleSubmit(secondPart)
              )}
              className="flex flex-col gap-3"
            >
              <FormField
                control={form.control}
                name="secondPart"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        disabled={loading}
                        rows={6}
                        placeholder="Complete the text above."
                        className="resize-none"
                        spellCheck={false}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={loading}
                className="shrink bg-green-600 hover:bg-green-700 active:bg-green-800"
              >
                {loading && (
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                )}
                {firstTry ? 'Evaluate' : 'Try Again'}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  )
}

export default UnderlinedTextArea
