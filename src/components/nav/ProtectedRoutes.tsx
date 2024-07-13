import { Outlet, Navigate } from 'react-router-dom'
import LoadingPage from '@/pages/LoadingPage'
import { useUser } from '@clerk/clerk-react'

const ProtectedRoutes = () => {
    const { isLoaded, isSignedIn } = useUser()

    if (isLoaded) {
        if (isSignedIn) {
            return <Outlet />
        } else {
            return <Navigate to='signup' />
        }
    } else {
        // return <SuspenseTrigger />
        return <LoadingPage />
    }
}

export default ProtectedRoutes