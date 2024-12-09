import { SignUp } from "@clerk/clerk-react";
import bgimage from '@/assets/sign-up-background.jpg'
import { useLocation } from "react-router-dom";

const Signup: React.FC = () => {
    const { state } = useLocation()

    return (
        <section
            className='bg-cover bg-center flex h-screen w-screen justify-center items-center'
            style={{ backgroundImage: `url(${bgimage})` }}
        >
            <SignUp
                fallbackRedirectUrl={state?.from ?? '/create-new-recipe'}
                path="/signup"
                signInUrl='signin'
            />
        </section>
    )
}

export default Signup