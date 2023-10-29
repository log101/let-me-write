import { SignUp } from '@clerk/nextjs'

export default async function SignUpPage() {
  return (
    <div className="flex h-[calc(100vh-theme(spacing.16))] items-center justify-center py-10">
      <SignUp />
    </div>
  )
}
