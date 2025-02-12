import { useEffect, useRef, useState } from 'react'
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
    triggerStream: () => void,
    clearStreamAndError: () => void,
}

const useSSE = (endpoint: string, body?: Record<string, any>): UseSSEReturn => {
    const { getToken } = useClerkAuth();

    const activeHttpRequest = useRef<AbortController[]>([])

    const [trigger, setTrigger] = useState<boolean>(false)
    const [stream, setStream] = useState<EventSourceMessage[]>([])
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        return () => terminateStream()
    }, []);

    useEffect(() => {
        if (trigger) {
            try {
                streamFnc()
            } finally {
                setTrigger(false)
            }
        }
    }, [trigger]);

    const triggerStream = () => setTrigger(true)

    const clearStreamAndError = () => {
        setStream([])
        setError(null)
    }

    const terminateStream = (error?: Error) => {
        activeHttpRequest.current.forEach(ctrl => ctrl.abort())
        setStream([])
        setTrigger(false)
        error && setError(error)
    }

    const streamFnc = async () => {
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
                terminateStream(error instanceof Error ? error : new Error('An error occurred while streaming data'))
            }
        });
    }

    return {
        stream, error, triggerStream, clearStreamAndError
    }
}

export default useSSE;