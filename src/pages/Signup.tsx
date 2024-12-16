import { SignUp } from "@clerk/clerk-react";
import Lottie from 'lottie-react'
import bgimage from '@/assets/sign-up-background.jpg'
import bgimageDark from '@/assets/sign-up-background-dark.png'
import { useLocation } from 'react-router-dom'
import { useTheme } from '@/context/theme-context'
import signUpPageAnimation from '@/assets/animations/signup-page-animation.json'
import { LargeLogo } from '@/components/Logo'

const Signup: React.FC = () => {
    const { state } = useLocation()
    const { theme } = useTheme()

    return (
        <section
            className='bg-cover bg-center flex h-screen w-screen'
            style={{ backgroundImage: `url(${theme === 'light' ? bgimage : bgimageDark})` }}
        >
            <div className='lg:flex hidden h-full max-w-[40rem] flex-1 flex-col justify-center items-center bg-amber-200 dark:bg-zinc-800'>
                <LargeLogo />
                <Lottie animationData={signUpPageAnimation} className='size-[30rem]' />
            </div>
            <div className='h-full flex-1 flex justify-center items-center'>
                <SignUp
                    fallbackRedirectUrl={state?.from ?? '/create-new-recipe'}
                    path="/signup"
                    signInUrl='signin'
                />
            </div>
        </section>

    )
}

export default Signup