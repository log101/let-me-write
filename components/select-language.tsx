'use client'

import { usePathname, useRouter } from 'next-intl/client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './ui/select'

const SelectLanguage = ({ locale }: { locale: string }) => {
  const pathname = usePathname()
  const router = useRouter()

  const handleLanguageChange = (val: string) => {
    if (val === locale) return
    else router.replace(pathname, { locale: val })
  }

  return (
    <Select defaultValue={locale} onValueChange={handleLanguageChange}>
      <SelectTrigger>
        <div className="mr-1">
          <SelectValue placeholder="Language" />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="tr">🇹🇷 Türkçe</SelectItem>
        <SelectItem value="en">🇺🇸 English (US)</SelectItem>
      </SelectContent>
    </Select>
  )
}

export default SelectLanguage
