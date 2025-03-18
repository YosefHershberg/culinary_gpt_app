import Lottie from 'lottie-react'
import { createFileRoute, useLocation } from '@tanstack/react-router'

import { useTheme } from '@/context/theme-context'
import { LargeLogo } from '@/components/Logo'

import signUpPageAnimation from '@/assets/animations/signup-page-animation.json'
import bgimage from '@/assets/sign-up-background.webp'
import bgimageDark from '@/assets/sign-up-background-dark.webp'
import { SignUp } from '@clerk/clerk-react'

export const Route = createFileRoute('/signup/$')({
  component: RouteComponent,
})

function RouteComponent() {
  const { state } = useLocation()
  const { theme } = useTheme()

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
          fallbackRedirectUrl={(state as any)?.from ?? '/create-recipe'}
          path="/signup"
          signInUrl='signin'
        />
      </section>
    </main>
  )
}
