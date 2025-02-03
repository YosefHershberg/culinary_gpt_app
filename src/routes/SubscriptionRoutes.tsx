import { Navigate, Outlet } from 'react-router-dom'

const SubscriptionRoutes = () => {
    const isSubscribed = false

    if (!isSubscribed) {
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