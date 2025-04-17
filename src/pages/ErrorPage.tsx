import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';

import errorPic from '@/assets/error-pic.webp';
import { type FallbackProps } from 'react-error-boundary';


const ErrorPage: React.FC<React.ComponentType<FallbackProps> | any> = ({ resetErrorBoundary, error, status, message }) => {
    const navigate = useNavigate();

    return (
        <main className="absolute bg-background top-0 h-screen w-screen flex flex-col justify-center items-center gap-7 p-4">
            <h1 className='text-red-600 text-3xl text-center font-bold px-1'>{message ? message : 'Something went terribly wrong!'}</h1>
            <div className="relative h-80 m-2">
                <h1 className='absolute top-[6rem] right-1/4 text-3xl text-red-600'>{status || 'Oops!'}</h1>
                <img className='h-full object-contain' src={errorPic} alt="Error" />
            </div>
            <h2 className='text-red-600 text-lg'>{error?.response?.data?.message}</h2>
            <div className='flex items-center gap-4'>
                <Button
                    className='font-bold h-12 w-32 rounded-full text-lg transition-all duration-200 hover:scale-105'
                    onClick={() => navigate({ to: '/' })}>
                    Go home
                </Button>
                <Button
                    className='font-bold h-12 w-32 rounded-full text-lg transition-all duration-200 hover:scale-105'
                    onClick={resetErrorBoundary || (() => navigate({ to: '/' }))}
                >
                    Try again
                </Button>
            </div>
        </main>
    );
};

export default ErrorPage;
