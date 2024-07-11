import { SignUp } from "@clerk/clerk-react";
import bgimage from '@/assets/sign-up-background.jpg'

const Signup = () => {
    return (
        <section
            className='bg-cover bg-center flex h-screen w-screen justify-center items-center'
            style={{ backgroundImage: `url(${bgimage})` }}
        >
            <SignUp
                redirectUrl='/create-new-recipe'
                path="/signup"
                signInUrl='signin'
            />
        </section>
    )
}

export default Signup