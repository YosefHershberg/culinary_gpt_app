import React, { useEffect } from 'react';
import { FallbackProps } from 'react-error-boundary';

import errorPic from '@/assets/error-pic.png';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const ErrorPage = ({ resetErrorBoundary, resetFunction, error ,status, message }: React.ComponentType<FallbackProps> | any) => {
    const navigate = useNavigate();

    useEffect(() => {
        console.log('Error:', resetFunction);
    }, [error]);

    return (
        <div className="h-screen w-screen flex flex-col justify-center items-center gap-10 p-4">
            <h1 className='text-red-600 text-3xl text-center font-bold px-1'>{message ? message : 'Something went terribly wrong!'}</h1>
            <div className="relative h-80 m-2">
                <h1 className='absolute top-[6rem] right-1/4 text-3xl text-red-600'>{status || 'Oops!'}</h1>
                <img className='h-full object-contain' src={errorPic} alt="Error" />
            </div>
                <Button
                    className='mt-4 font-bold h-12 w-32 rounded-full text-lg transition-all duration-200 hover:scale-105'
                    onClick={resetErrorBoundary || (() => navigate('/'))}
                >
                    Try again
                </Button>
        </div>
    );
};

export default ErrorPage;
