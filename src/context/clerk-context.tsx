import { ClerkProvider as CP } from '@clerk/clerk-react'
import { dark } from '@clerk/themes';
import env from '@/utils/env';
import { useTheme } from './theme-context';

const ClerkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { theme } = useTheme()

    return (
        <CP
            afterSignOutUrl={'/'}
            signInFallbackRedirectUrl={'/create-new-recipe'}
            signUpFallbackRedirectUrl={'/create-new-recipe'}
            publishableKey={env.VITE_CLERK_PUBLISHABLE_KEY}
            appearance={theme === 'dark' ? {
                baseTheme: dark
            } : undefined}
        >
            {children}
        </CP>
    )
}

export default ClerkProvider