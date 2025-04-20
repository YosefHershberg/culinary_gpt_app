import { useEffect, useRef, useState, useCallback } from 'react'
import { useAuth as useClerkAuth } from '@clerk/clerk-react'
import { fetchEventSource } from '@microsoft/fetch-event-source'
import env from '@/utils/env'

type EventSourceMessage = {
    event: string,
    payload: string
}

type UseSSEReturn = {
    stream: EventSourceMessage[],
    error: Error | null,
    executeStream: (body?: Record<string, any>) => void,
    clearStreamAndError: () => void,
}

const useSSE = (endpoint: string): UseSSEReturn => {
    const { getToken } = useClerkAuth();

    const activeHttpRequest = useRef<AbortController[]>([])
    
    const [stream, setStream] = useState<EventSourceMessage[]>([])
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        return () => terminateStream()
    }, []);

    const clearStreamAndError = () => {
        setStream([])
        setError(null)
    }

    const terminateStream = (error?: Error) => {
        activeHttpRequest.current.forEach(ctrl => ctrl.abort())
        setStream([])
        error && setError(error)
    }

    const executeStream = useCallback(async (body?: Record<string, any>) => {
        const ctrl = new AbortController();

        activeHttpRequest.current.push(ctrl)

        await fetchEventSource(`${env.VITE_API_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await getToken()}`
            },
            openWhenHidden: true,
            signal: ctrl.signal,
            body: JSON.stringify(body),
            onmessage(msg) {
                const parsedData = JSON.parse(msg.data)

                if (parsedData.event === 'error') {
                    return terminateStream(new Error(parsedData.payload));
                }

                if (typeof parsedData !== 'object' || !parsedData.event || !parsedData.payload) {
                    return terminateStream(new Error('Invalid message format'));
                }

                setStream(prevData => [...prevData, parsedData])
            },
            onerror(error) {
                terminateStream(error instanceof Error ?
                    error : new Error('An error occurred while streaming data')
                )
            }
        });
    }, [endpoint, getToken, terminateStream]);

    return {
        stream,
        error,
        executeStream,
        clearStreamAndError
    }
}

export default useSSE;