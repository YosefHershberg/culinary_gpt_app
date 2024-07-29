import { createContext, useContext, useLayoutEffect } from 'react'
import { useUser, useAuth as useClerkAuth } from '@clerk/clerk-react'
import { UserResource } from '@clerk/types';

import axiosClient from '@/lib/axiosClient';
import { toast } from '@/components/ui/use-toast';

type AuthProviderState = {
    user: UserResource | null | undefined | any, //NOTO: properly type this
    isSignedIn: boolean | undefined,
    isLoaded: boolean
}

const AuthContext = createContext<AuthProviderState>(undefined as any);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { user, isSignedIn, isLoaded } = useUser();
    const { getToken } = useClerkAuth();

    useLayoutEffect(() => {
        let interceptorRequests: number;
        let interceptorResponses: number;

        interceptorRequests = axiosClient.interceptors.request.use(
            async (req) => {
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

    return (
        <AuthContext.Provider value={{ user, isSignedIn, isLoaded }}>
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
