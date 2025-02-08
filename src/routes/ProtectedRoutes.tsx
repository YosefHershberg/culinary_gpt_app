import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import { FeaturesProviders } from '@/Providers';

/**
 * @description A component that checks if the user is signed in. If the user is not signed in, the user is redirected to the sign in page.
 * @returns Outlet. The children of the ProtectedRoutes component Route. See routes/index.tsx
 */
const ProtectedRoutes: React.FC = () => {
    const { isSignedIn } = useUser()
    const location = useLocation();

    if (!isSignedIn) {
        return (
            <Navigate
                to="/signin"
                state={{ from: location.pathname }}
                replace
            />
        )
    }

    return (
        <FeaturesProviders>
            <Outlet />
        </FeaturesProviders>
    )
}

export default ProtectedRoutes