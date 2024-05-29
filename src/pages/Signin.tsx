import { SignIn } from '@clerk/clerk-react'

const Signin = () => {

    return (
        <div className="flex h-screen w-screen justify-center items-center">
            <SignIn
                redirectUrl='/create-new-recipe'
                path="/signin"
                signUpUrl='signup'
            />
        </div>
    )
}

export default Signin