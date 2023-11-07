import { authMiddleware } from '@clerk/nextjs'
import createMiddleware from 'next-intl/middleware'

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'tr'],

  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: 'en',
  localeDetection: false
})

export default authMiddleware({
  beforeAuth: req => {
    return intlMiddleware(req)
  },
  publicRoutes: ['/(share)/(.*)', '/:locale/sign-in']
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
}
