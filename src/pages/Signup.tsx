import { SignUp } from "@clerk/clerk-react";

const Signup = () => {
    return (
        <div className="flex h-screen w-screen justify-center items-center">
            <SignUp
                redirectUrl='/create-new-recipe'
                path="/signup"
                signInUrl='signin'
            />
        </div>
    )
}

export default Signup