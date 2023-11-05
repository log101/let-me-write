import { authMiddleware } from '@clerk/nextjs'

export default authMiddleware({
  publicRoutes: ['/(share)/(.*)']
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
}
