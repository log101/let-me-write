import { Dispatch, SetStateAction } from 'react'
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
import { useTranslations } from 'next-intl'

export function TextSelector({
  text,
  setText,
  resetAnalysis
}: {
  text: Text | undefined
  setText: Dispatch<SetStateAction<Text | undefined>>
  resetAnalysis: () => void
}) {
  const t = useTranslations('Home')

  return (
    <div className="rounded-lg border bg-background p-8">
      <Select
        onValueChange={id => {
          setText(TEXTS.find(text => text.id === id))
          resetAnalysis()
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder={t('selectTextPlaceholder')} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{t('selectTextHeading')}</SelectLabel>
            {TEXTS.map(text => (
              <SelectItem value={`${text.id}`} key={`${text.id}`}>
                {text.title}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {!text ? (
        <p className="mt-3 p-1 font-semibold">{t('selectText')}</p>
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
  )
}
