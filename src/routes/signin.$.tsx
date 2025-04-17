import { useTheme } from '@/context/theme-context'

import { z } from 'zod'
import Lottie from 'lottie-react'
import { SignIn } from '@clerk/clerk-react'
import { LargeLogo } from '@/components/Logo'

import { createFileRoute, redirect, retainSearchParams } from '@tanstack/react-router'
import signUpPageAnimation from '@/assets/animations/signup-page-animation.json'
import bgimage from '@/assets/sign-up-background.webp'
import bgimageDark from '@/assets/sign-up-background-dark.webp'

// NOTE: Need the $ at the end of the path to allow clerk redirect to work
export const Route = createFileRoute('/signin/$')({
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
  const { redirect } = Route.useSearch()
  const { theme } = useTheme()

  return (
    <main
      className='bg-cover bg-center flex flex-1 w-screen'
      style={{ backgroundImage: `url(${theme === 'light' ? bgimage : bgimageDark})` }}
    >
      <section className='flex-1 flex justify-center items-center'>
        <SignIn
          fallbackRedirectUrl={redirect ?? '/create-recipe'}
          path="/signin"
          signUpUrl='signup'
        />
      </section>
      <div className='lg:flex hidden max-w-[40rem] flex-1 flex-col justify-center items-center bg-amber-200 dark:bg-zinc-800'>
        <LargeLogo />
        <p className='mt-5 text-lg'>We'll find you perfect dish to prepare!</p>
        <Lottie animationData={signUpPageAnimation} className='size-[30rem]' />
      </div>
    </main>
  )
}