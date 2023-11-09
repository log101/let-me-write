'use client'

import React, { ReactNode } from 'react'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { ReloadIcon } from '@radix-ui/react-icons'
import z from 'zod'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import TextInputDescription from './text-input-description'
import { useTranslations } from 'next-intl'

const FormSchema = z.object({
  secondPart: z
    .string()
    .min(50, {
      message: 'Your paragraph must be at least 50 characters.'
    })
    .max(1000, {
      message: 'Your paragraph must not be longer than 1000 characters.'
    })
})

const UserTextInputArea = ({
  handleSubmit,
  loading,
  firstTry,
  resetAnalysis
}: {
  handleSubmit: (text: string) => void
  loading: boolean
  firstTry: boolean
  resetAnalysis: () => void
}) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    // @ts-ignore
    resolver: zodResolver(FormSchema)
  })

  const router = useRouter()
  const t = useTranslations('Home')

  return (
    <>
      <TextInputDescription />
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
                        placeholder={t('textInputPlaceholder')}
                        className="resize-none"
                        spellCheck={false}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {firstTry ? (
                <Button
                  type="submit"
                  disabled={loading}
                  className="shrink bg-green-600 hover:bg-green-700 active:bg-green-800"
                >
                  {loading && (
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {t('evaluateButton')}
                </Button>
              ) : (
                <Button
                  onClick={e => {
                    e.preventDefault()
                    form.reset({ secondPart: '' })
                    resetAnalysis()
                    router.refresh()
                  }}
                  className="shrink bg-green-600 hover:bg-green-700 active:bg-green-800"
                >
                  {t('tryAgainButton')}
                </Button>
              )}
            </form>
          </Form>
        </div>
      </div>
    </>
  )
}

export default UserTextInputArea
