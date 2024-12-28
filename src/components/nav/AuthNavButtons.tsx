import { Button } from '@/components/ui/button'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { useAuth } from '@/context/auth-context'
import { UserButton } from '@clerk/clerk-react'
import { Link } from 'react-router-dom';

const AuthNavButtons = () => {
    const { isSignedIn, isLoaded } = useAuth();

    if (!isLoaded) {
        return <LoadingSpinner className="size-8" />;
    }

    return isSignedIn ? (
        <Button size="icon" variant="outline" className="p-0 rounded-full">
            <UserButton
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
                asChild
            >
                <Link to='/signin'>Sign in</Link>
            </Button>
            <Button
                className="hover:scale-105 rounded-full"
                variant="secondary"
                asChild
            >
                <Link to='/signup'>Sign up</Link>
            </Button>
        </>
    );
};


export default AuthNavButtons