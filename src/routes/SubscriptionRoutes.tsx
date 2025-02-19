import { useAuth } from '@/context/auth-context'
import { Navigate, Outlet } from 'react-router-dom'

/**
 * @description A component that checks if the user is subscribed. If the user is not subscribed, the user is redirected to the subscribe page.
 * @returns Outlet. The children of the SubscriptionRoutes component Route. See routes/index.tsx
 */
const SubscriptionRoutes = () => {
    const { user } = useAuth()

    if (!user.isSubscribed) {
        return (
            <Navigate 
                to="/subscribe"
                replace
            />
        )
    }

    return <Outlet />
}

export default SubscriptionRoutes