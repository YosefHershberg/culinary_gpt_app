import { useNavigate } from 'react-router-dom'
import ErrorPage from '@/pages/ErrorPage'

const NotFoundPage: React.FC = () => {
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