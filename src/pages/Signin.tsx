import { SignIn } from '@clerk/clerk-react'
import bgimage from '@/assets/sign-up-background.jpg'

const Signin = () => {

    return (
        <div
            className='bg-cover bg-center flex h-screen w-screen justify-center items-center'
            style={{backgroundImage: `url(${bgimage})`}}
        >
            <SignIn
                redirectUrl='/create-new-recipe'
                path="/signin"
                signUpUrl='signup'
            />
        </div>
    )
}

export default Signin