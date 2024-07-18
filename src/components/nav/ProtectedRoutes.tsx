import { Outlet, Navigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import SuspenseTrigger from '../SuspenseTrigger'

const ProtectedRoutes = () => {
    const { isLoaded, isSignedIn } = useUser()

    if (isLoaded) {
        if (isSignedIn) {
            return <Outlet />
        } else {
            return <Navigate to='signup' />
        }
    } else {
        return <SuspenseTrigger />
    }
}

export default ProtectedRoutes