import { Outlet, Navigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import LoadingPage from '@/pages/LoadingPage'

const ProtectedRoutes = () => {
    const { isLoaded, isSignedIn } = useUser()

    if (isLoaded) {
        if (isSignedIn) {
            return <Outlet />
        } else {
            return <Navigate to='signup' />
        }
    } else {
        return <LoadingPage />
    }
}

export default ProtectedRoutes