import { useTheme } from '@/context/theme-context'

import Lottie from 'lottie-react'
import { LargeLogo } from '@/components/Logo'
import { SignUp } from '@clerk/clerk-react'

import { createFileRoute, redirect, retainSearchParams } from '@tanstack/react-router'
import signUpPageAnimation from '@/assets/animations/signup-page-animation.json'
import bgimage from '@/assets/sign-up-background.webp'
import bgimageDark from '@/assets/sign-up-background-dark.webp'
import { z } from 'zod'

// NOTE: Need the $ at the end of the path to allow clerk redirect to work
export const Route = createFileRoute('/signup/$')({
  beforeLoad: ({ context }) => {
    if (context.auth.isSignedIn) {
      throw redirect({ to: '/', replace: true })
    }
  },
  validateSearch: z.object({
    redirect: z.string().optional(),
  }),
  search: {
    // Retain the usersView search param while navigating
    // within or to this route (or it's children!)
    middlewares: [retainSearchParams(['redirect'])],
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { theme } = useTheme()
  const { redirect } = Route.useSearch()

  return (
    <main
      className='bg-cover bg-center flex flex-1 w-screen'
      style={{ backgroundImage: `url(${theme === 'light' ? bgimage : bgimageDark})` }}
    >
      <div className='lg:flex hidden max-w-[40rem] flex-1 flex-col justify-center items-center bg-amber-200 dark:bg-zinc-800'>
        <LargeLogo />
        <p className='mt-5 text-lg'>We'll find you perfect dish to prepare!</p>
        <Lottie animationData={signUpPageAnimation} className='size-[30rem]' />
      </div>
      <section className='flex-1 flex justify-center items-center'>
        <SignUp
          fallbackRedirectUrl={redirect ?? '/create-recipe'}
          path="/signup"
          signInUrl='signin'
        />
      </section>
    </main>
  )
}
