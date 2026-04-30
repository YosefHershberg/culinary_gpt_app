import { z } from 'zod'
import Lottie from 'lottie-react'
import { LargeLogo } from '@/components/Logo'
import { supabase } from '@/config/supabase'
import { Button } from '@/components/ui/button'
import { PageBackground } from '@/components/PageBackground'

import { createFileRoute, redirect, retainSearchParams } from '@tanstack/react-router'
import signUpPageAnimation from '@/assets/animations/signup-page-animation.json'

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
    middlewares: [retainSearchParams(['redirect'])],
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { redirect: redirectUrl } = Route.useSearch()

  const handleGoogleAuth = async () => {
    const absoluteRedirect = redirectUrl
      ? new URL(redirectUrl, window.location.origin).href
      : window.location.origin

    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: absoluteRedirect,
        queryParams: {
          prompt: 'select_account',
        },
      },
    })
  }

  return (
    <main className='relative flex flex-1 w-screen overflow-hidden'>
      <PageBackground />

      <section className='relative z-10 flex-1 flex justify-center items-center'>
        <div className='flex flex-col items-center gap-6 p-8 rounded-xl bg-background/90 backdrop-blur-sm shadow-lg max-w-sm w-full mx-4'>
          <h1 className='text-2xl font-bold'>Welcome to CulinaryGPT</h1>
          <p className='text-muted-foreground text-center'>Sign in or create an account to continue</p>
          <Button
            variant='outline'
            className='w-full flex items-center gap-3 h-11'
            onClick={handleGoogleAuth}
          >
            <svg className="size-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
          </Button>
        </div>
      </section>

      <div className='relative z-10 lg:flex hidden max-w-[40rem] flex-1 flex-col justify-center items-center bg-amber-200 dark:bg-zinc-800'>
        <LargeLogo />
        <p className='mt-5 text-lg'>We'll find you perfect dish to prepare!</p>
        <Lottie animationData={signUpPageAnimation} className='size-[30rem]' />
      </div>
    </main>
  )
}
