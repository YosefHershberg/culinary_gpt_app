import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import LoadingPage from '@/pages/LoadingPage'

const ProtectedRoutes: React.FC = () => {
    const { isLoaded, isSignedIn } = useUser()
    const location = useLocation();

    if (!isLoaded) return <LoadingPage />

    if (!isSignedIn) {
        return (
            <Navigate
                to="/signin"
                state={{ from: location.pathname }}
                replace
            />
        )
    }

    return <Outlet />
}

export default ProtectedRoutes