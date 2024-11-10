import { useEffect, useRef, useState } from 'react'
import { useAuth as useClerkAuth } from '@clerk/clerk-react'
import { fetchEventSource } from '@microsoft/fetch-event-source'
import env from '@/config/env'

interface EventSourceMessage {
    event: string,
    data: string
}

interface UseSSEReturn {
    stream: EventSourceMessage[],
    error: Error | null,
    triggerStream: () => void,
    clearStream: () => void
}

const useSSE = (endpoint: string, body?: Record<string, any>): UseSSEReturn => {
    const { getToken } = useClerkAuth();

    const activeHttpRequest = useRef<AbortController[]>([])

    const [trigger, setTrigger] = useState<boolean>(false)
    const [stream, setStream] = useState<EventSourceMessage[]>([])
    const [error, setError] = useState<Error | null>(null)

    const triggerStream = () => setTrigger(true)

    const clearStream = () => setStream([])

    const streamFnc = async () => {
        const ctrl = new AbortController();

        activeHttpRequest.current.push(ctrl)

        await fetchEventSource(`${env.VITE_API_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await getToken()}`
            },
            signal: ctrl.signal,
            body: JSON.stringify(body),
            onmessage(msg) {
                if (msg.event === 'FatalError') {
                    throw new Error(msg.data);
                }
                const parsedData = JSON.parse(msg.data)

                // TODO: Check if of type EventSourceMessage
                setStream(prevData => [...prevData, parsedData])
            },
            onerror(error) {
                setError(error)
                setTrigger(false)
                activeHttpRequest.current.forEach(ctrl => ctrl.abort())
            }
        });
    }

    useEffect(() => {
        return () => {
            activeHttpRequest.current.forEach(ctrl => ctrl.abort())
        }
    }, []);

    useEffect(() => {
        if (trigger) {
            try {
                streamFnc()
            } catch (error) {
                if (error instanceof Error) {
                    setError(error)
                } else {
                    setError(new Error('An error occurred while streaming data.'))
                }
            } finally {
                setTrigger(false)
            }
        }
    }, [trigger]);

    return {
        stream, error, triggerStream, clearStream
    }
}

export default useSSE

const objectToQueryString = (obj: Record<string, any>): string => {
    return Object.entries(obj)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');
}
