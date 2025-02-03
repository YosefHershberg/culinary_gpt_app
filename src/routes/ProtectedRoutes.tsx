import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'

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

    return <Outlet />
}

export default ProtectedRoutes