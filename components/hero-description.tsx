import { useTranslations } from 'next-intl'

const HeroDescription = () => {
  const t = useTranslations('Home')

  return (
    <div className="rounded-lg border bg-background p-8">
      <h1 className="mb-2 text-lg font-semibold">{t('title')}</h1>
      <p className="mb-2 leading-normal text-muted-foreground">
        {t('appDescription')}
      </p>
    </div>
  )
}

export default HeroDescription
