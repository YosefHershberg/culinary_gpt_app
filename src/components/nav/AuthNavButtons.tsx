import { Button } from '@/components/ui/button'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { useAuth } from '@/context/auth-context'
import { UserButton } from '@clerk/clerk-react'

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
                <a href='/signin'>Sign in</a>
            </Button>
            <Button
                className="hover:scale-105 rounded-full"
                variant="secondary"
                asChild
            >
                <a href='/signup'>Sign up</a>
            </Button>
        </>
    );
};


export default AuthNavButtons