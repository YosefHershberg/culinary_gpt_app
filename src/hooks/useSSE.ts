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
}

const useSSE = (endpoint: string, body?: Record<string, any>): UseSSEReturn => {
    const { getToken } = useClerkAuth();

    const activeHttpRequest = useRef<AbortController[]>([])

    const [trigger, setTrigger] = useState<boolean>(false)
    const [stream, setStream] = useState<EventSourceMessage[]>([])
    const [error, setError] = useState<Error | null>(null)

    const triggerStream = () => setTrigger(true)

    const streamFnc = async () => {
        const ctrl = new AbortController();

        activeHttpRequest.current.push(ctrl)

        await fetchEventSource(`${env.VITE_API_URL}${endpoint}?${body && objectToQueryString(body)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await getToken()}`
            },
            // body: JSON.stringify({ foo: 'bar' }),
            signal: ctrl.signal,
            onmessage(msg) {
                if (msg.event === 'FatalError') {
                    throw new Error(msg.data);
                }
                const parsedData = JSON.parse(msg.data)

                // TODO: Check if of type EventSourceMessage
                setStream(prevData => [...prevData, parsedData])
            },
            onerror() {
                ctrl.abort()
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
            }
        }
    }, [trigger]);

    return {
        stream, error, triggerStream
    }
}

export default useSSE

const objectToQueryString = (obj: Record<string, any>): string => {
    return Object.entries(obj)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');
}
