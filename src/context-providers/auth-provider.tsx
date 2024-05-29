import { createContext, useContext, useLayoutEffect } from 'react'
import { useUser, useAuth as useClerkAuth } from '@clerk/clerk-react'
import { UserResource } from '@clerk/types';
import axiosClient from '@/lib/axiosClient';

type ThemeProviderState = {
    user: UserResource | null | undefined,
    isSignedIn: boolean | undefined,
    isLoaded: boolean
}

const initialState: ThemeProviderState = {
    user: null,
    isSignedIn: false,
    isLoaded: false
}
const AuthContext = createContext<ThemeProviderState>(initialState);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { user, isSignedIn, isLoaded } = useUser();
    const { getToken } = useClerkAuth();

    useLayoutEffect(() => {
        let interceptorRequests: number;

        const addInterceptors = async () => {
            interceptorRequests = axiosClient.interceptors.request.use(
                async (req) => {
                    req.headers.Authorization = `Bearer ${await getToken()}`;
                    return req;
                },
                (error: Error) => error,
            );
        }

        console.log('auth running');
        
        isSignedIn && addInterceptors();

        return () => {
            axiosClient.interceptors.request.eject(interceptorRequests);
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
