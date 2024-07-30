import { SignIn } from '@clerk/clerk-react'
import bgimage from '@/assets/sign-up-background.jpg'

const Signin: React.FC = () => {

    return (
        <section
            className='bg-cover bg-center flex h-screen w-screen justify-center items-center'
            style={{ backgroundImage: `url(${bgimage})` }}
        >
            <SignIn
                redirectUrl='/create-new-recipe'
                path="/signin"
                signUpUrl='signup'
            />
        </section>
    )
}

export default Signin