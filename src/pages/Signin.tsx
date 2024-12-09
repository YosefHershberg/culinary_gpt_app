import { SignIn } from '@clerk/clerk-react'
import bgimage from '@/assets/sign-up-background.jpg'
import { useLocation } from 'react-router-dom'

const Signin: React.FC = () => {
    const { state } = useLocation()

    return (
        <section
            className='bg-cover bg-center flex h-screen w-screen justify-center items-center'
            style={{ backgroundImage: `url(${bgimage})` }}
        >
            <SignIn
                fallbackRedirectUrl={state?.from ?? '/create-new-recipe'}
                path="/signin"
                signUpUrl='signup'
            />
        </section>
    )
}

export default Signin