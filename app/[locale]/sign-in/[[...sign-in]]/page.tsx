import { auth } from '@clerk/nextjs'
import { SignIn } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export default async function SignInPage() {
  const session = auth()
  // redirect to home if user is already logged in
  if (session?.userId) {
    redirect('/')
  }
  return (
    <div className="flex h-[calc(100vh-theme(spacing.16))] items-center justify-center py-10">
      <SignIn />
    </div>
  )
}
