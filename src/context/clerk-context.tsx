import { ClerkProvider as CP } from '@clerk/clerk-react'
import { dark } from '@clerk/themes';
import env from '@/lib/env';
import { useTheme } from './theme-context';

const ClerkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { theme } = useTheme()

    if (theme === 'light') {
        return (
            <CP
                publishableKey={env.VITE_CLERK_PUBLISHABLE_KEY}
            >
                {children}
            </CP>
        )
    } else {
        return (
            <CP
                publishableKey={env.VITE_CLERK_PUBLISHABLE_KEY}
                appearance={{
                    baseTheme: dark
                }}
            >
                {children}
            </CP>
        )
    }
}

export default ClerkProvider