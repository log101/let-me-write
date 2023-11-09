import { useTranslations } from 'next-intl'

export const TextInputDescription = () => {
  const t = useTranslations('Home')

  return (
    <div className="mx-auto mb-4 flex max-w-2xl flex-col gap-4 px-4">
      <div className="rounded-lg border bg-background p-8">
        <p className="font-semibold">{t('yourTurn')}</p>
      </div>
    </div>
  )
}

export default TextInputDescription
