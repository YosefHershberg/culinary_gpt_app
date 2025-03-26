import { useAuth } from '@clerk/clerk-react'
import { useEffect } from 'react';

const useHasAuthed = () => {
    const { isSignedIn } = useAuth()

    useEffect(() => {
        const hasAuthFromStorage = localStorage.getItem('hasAuthed')

        if (isSignedIn && !hasAuthFromStorage) {``
            localStorage.setItem('hasAuthed', 'true')
        }
    }, [isSignedIn]);

    return null
}

export default useHasAuthed