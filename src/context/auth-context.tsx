import { createContext, useContext, useEffect, useLayoutEffect, useState } from 'react'
import { supabase } from '@/config/supabase'
import axiosClient from '@/config/axiosClient'
import { toast } from '@/components/ui/use-toast'
import LoadingPage from '@/pages/LoadingPage'
import { useRouter } from '@tanstack/react-router'

import type { Session } from '@supabase/supabase-js'

export type AppUser = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    fullName: string;
    imageUrl: string | null;
    hasImage: boolean;
}

export type AuthProviderState = {
    user: AppUser | null;
    isSignedIn: boolean;
    isLoaded: boolean;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthProviderState>(undefined as any);

function mapSupabaseUser(session: Session | null): AppUser | null {
    if (!session?.user) return null;

    const { user } = session;
    const meta = user.user_metadata ?? {};
    const fullName = meta.full_name || meta.name || '';
    const nameParts = fullName.split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';
    const imageUrl = meta.avatar_url || meta.picture || null;

    return {
        id: user.id,
        email: user.email || '',
        firstName,
        lastName,
        fullName,
        imageUrl,
        hasImage: !!imageUrl,
    };
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [session, setSession] = useState<Session | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const router = useRouter();

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setIsLoaded(true);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);


        });

        return () => subscription.unsubscribe();
    }, []);

    useLayoutEffect(() => {
        const interceptorRequests = axiosClient.interceptors.request.use(
            async (req) => {
                const { data: { session: currentSession } } = await supabase.auth.getSession();
                if (currentSession?.access_token) {
                    req.headers.Authorization = `Bearer ${currentSession.access_token}`;
                }
                return req;
            },
            (error: Error) => error,
        );

        const interceptorResponses = axiosClient.interceptors.response.use(
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
    }, []);

    const signOut = async () => {
        await supabase.auth.signOut();
        setSession(null);
        router.navigate({ to: '/' });
    };

    if (!isLoaded) {
        return <LoadingPage />
    }

    const user = mapSupabaseUser(session);

    return (
        <AuthContext.Provider value={{
            user,
            isSignedIn: !!session,
            isLoaded,
            signOut,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)

    if (context === undefined)
        throw new Error("useAuth must be used within an AuthProvider")

    return context
}
