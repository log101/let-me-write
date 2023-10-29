'use client'

import { Dispatch, SetStateAction, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from './ui/select'
import { TEXTS, Text } from '@/lib/consts'

export function TextSelector({
  text,
  setText,
  resetAnalysis
}: {
  text: Text | undefined
  setText: Dispatch<SetStateAction<Text | undefined>>
  resetAnalysis: () => void
}) {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-4 px-4">
      <div className="rounded-lg border bg-background p-8">
        <h1 className="mb-2 text-lg font-semibold">Let Me Write ✍️</h1>
        <p className="mb-2 leading-normal text-muted-foreground">
          Now it&apos;s your turn to write! Choose a piece from below and
          complete the missing texts by writing them yourself. After completing
          the text, press the evaluation button to see your shortcomings.
        </p>
      </div>

      <div className="rounded-lg border bg-background p-8">
        <Select
          onValueChange={id => {
            setText(TEXTS.find(text => text.id === id))
            resetAnalysis()
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a text" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Texts</SelectLabel>
              {TEXTS.map(text => (
                <SelectItem value={`${text.id}`} key={`${text.id}`}>
                  {text.title}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {!text ? (
          <p className="mt-3 p-1 font-semibold">Please select a text.</p>
        ) : (
          <div className="mt-2 flex flex-col p-1">
            <div>
              <h3 className="my-2 text-center leading-normal text-slate-900">
                {text?.title}
              </h3>
              <h4 className="my-2 text-center leading-normal text-slate-500">
                {text?.author}
              </h4>
            </div>
            <p className="my-2 text-justify leading-normal">{text?.text}</p>
          </div>
        )}
      </div>
    </div>
  )
}
