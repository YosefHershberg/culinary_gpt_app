import ErrorPage from '@/pages/ErrorPage'
import { useNavigate } from 'react-router-dom'

const NotFoundPage = () => {
    const navigate = useNavigate()

    return (
        <ErrorPage 
            message='URL Path no found!'
            resetFunction={() => navigate('/')}
            status={404}
        />
    )
}

export default NotFoundPage