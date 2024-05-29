import { ClerkProvider as CP } from '@clerk/clerk-react'
import { useNavigate } from "react-router-dom"
import { dark } from '@clerk/themes';
import { useTheme } from './theme-provider';
import env from '@/lib/env';

const ClerkProvider = ({ children }: { children: React.ReactNode }) => {
    const { theme } = useTheme()
    const navigate = useNavigate()

    if (theme === 'light') {
        return <CP
            navigate={navigate}
            publishableKey={env.VITE_CLERK_PUBLISHABLE_KEY}
        >
            {children}
        </CP>
    } else {
        return (
            <CP
                navigate={navigate}
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