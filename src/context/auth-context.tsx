import { createContext, useContext, useLayoutEffect } from 'react'
import { useUser, useAuth as useClerkAuth } from '@clerk/clerk-react'
import { SignOut, UserResource } from '@clerk/types';

import axiosClient from '@/config/axiosClient';
import { toast } from '@/components/ui/use-toast';
import LoadingPage from '@/pages/LoadingPage';
import useHasAuthed from '@/hooks/useHasAuthed';

export type AuthProviderState = {
    user: UserResource | null | undefined | any, // NOTE: any is because the clerk type isn't compatible to updated clerk version
    isSignedIn: boolean | undefined,
    isLoaded: boolean,
    signOut: SignOut
}

const AuthContext = createContext<AuthProviderState>(undefined as any);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user, isSignedIn, isLoaded } = useUser();
    const { getToken, signOut } = useClerkAuth();
    useHasAuthed()
    // const { isLoading: isSubscribedLoading, isSubscribed } = useIsSubscribed();

    useLayoutEffect(() => {
        let interceptorRequests: number;
        let interceptorResponses: number;

        interceptorRequests = axiosClient.interceptors.request.use(
            async (req) => {
                // TODO: check if this is the correct way to handle this without await getToken()
                req.headers.Authorization = `Bearer ${await getToken()}`;
                return req;
            },
            (error: Error) => error,
        );

        interceptorResponses = axiosClient.interceptors.response.use(
            (res) => res,
            (error: any) => {
                if (error.response?.status === 429) {
                    toast({
                        variant: 'destructive',
                        title: "Too many requests",
                        description: "Please try again later.",
                    })
                    throw new Error("Too many requests. Please try again later.");
                }
                return Promise.reject(error);
            },
        );

        return () => {
            axiosClient.interceptors.request.eject(interceptorRequests);
            axiosClient.interceptors.response.eject(interceptorResponses);
        }
    }, [isSignedIn]);

    if (!isLoaded) {
        return <LoadingPage />
    }

    return (
        <AuthContext.Provider value={{
            user,
            isSignedIn,
            isLoaded,
            signOut
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)

    if (context === undefined)
        throw new Error("useTheme must be used within a ThemeProvider")

    return context
}
