import { Button } from '@/components/ui/button'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { useAuth } from '@/context/auth-context'
import { UserButton } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'

const AuthNavButtons = () => {
    const navigate = useNavigate();
    const { isSignedIn, isLoaded } = useAuth();

    if (!isLoaded) {
        return <LoadingSpinner className="size-8" />;
    }

    return isSignedIn ? (
        <Button size="icon" variant="outline" className="p-0 rounded-full">
            <UserButton
                afterSignOutUrl="/"
                appearance={{
                    elements: {
                        userButtonAvatarBox: {
                            height: "100%",
                            width: "100%",
                        },
                    },
                }}
            />
        </Button>
    ) : (
        <>
            <Button
                className="hover:scale-105 rounded-full"
                variant="ghost"
                onClick={() => navigate('/signin')}
            >
                Sign in
            </Button>
            <Button
                className="hover:scale-105 rounded-full"
                variant="secondary"
                onClick={() => navigate('/signup')}
            >
                Sign up
            </Button>
        </>
    );
};


export default AuthNavButtons