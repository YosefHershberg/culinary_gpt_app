import LoadingPage from '@/pages/LoadingPage'
import { useUser } from '@clerk/clerk-react'
import { Outlet, Navigate } from 'react-router-dom'

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