import React from 'react';
import errorPic from '@/assets/error-pic.png';
import { FallbackProps } from 'react-error-boundary';
import { Button } from '@/components/ui/button';

const ErrorPage = ({ resetErrorBoundary, resetFunction, status, message }: React.ComponentType<FallbackProps> | any) => {
    
    return (
        <div className="h-screen w-screen flex flex-col justify-center items-center gap-10 p-4">
            <h1 className='text-red-600 text-3xl text-center px-1'>{message ? message : 'Something went terribly wrong!'}</h1>
            <div className="relative h-80 m-2">
                <h1 className='absolute top-[6rem] right-1/4 text-3xl text-red-600'>{status || 'Oops!'}</h1>
                <img className='h-full object-contain' src={errorPic} alt="Error" />
            </div>
            {(resetFunction || resetErrorBoundary) &&
                <Button className='mt-4' onClick={resetFunction || resetErrorBoundary}>Try again</Button>
            }
        </div>
    );
};

export default ErrorPage;
