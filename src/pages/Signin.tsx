import Lottie from 'lottie-react'
import { SignIn } from '@clerk/clerk-react'
import bgimage from '@/assets/sign-up-background.webp'
import bgimageDark from '@/assets/sign-up-background-dark.webp'
import { useLocation } from 'react-router-dom'
import { useTheme } from '@/context/theme-context'
import signUpPageAnimation from '@/assets/animations/signup-page-animation.json'
import { LargeLogo } from '@/components/Logo'

const Signin: React.FC = () => {
    const { state } = useLocation()
    const { theme } = useTheme()

    return (
        <main
            className='bg-cover bg-center flex h-screen w-screen'
            style={{ backgroundImage: `url(${theme === 'light' ? bgimage : bgimageDark})` }}
        >
            <section className='h-full flex-1 flex justify-center items-center'>
                <SignIn
                    fallbackRedirectUrl={state?.from ?? '/create-new-recipe'}
                    path="/signin"
                    signUpUrl='signup'
                />
            </section>
            <div className='lg:flex hidden h-full max-w-[40rem] flex-1 flex-col justify-center items-center bg-amber-200 dark:bg-zinc-800'>
                <LargeLogo />
                <p className='mt-5 text-lg'>We'll find you perfect dish to prepare!</p>
                <Lottie animationData={signUpPageAnimation} className='size-[30rem]' />
            </div>
        </main>
    )
}

export default Signin