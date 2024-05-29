import { useRef, useEffect, useState, useCallback } from 'react';
import { AxiosError, AxiosResponse } from "axios";
import axiosClient from '@/lib/axiosClient';

interface UseHttpClientProps {
    endpoint: string,
    method: 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH',
    body?: any,
    params?: any,
    headers?: any
}

interface UseHttpClientResponseType {
    data: any,
    error: AxiosError | null,
    isLoading: boolean,
    triggerHttpReq: () => void,
    responseStatus: number | null
}

const useHttpClient = ({ endpoint, method, body, params }: UseHttpClientProps): UseHttpClientResponseType => {
    const activeHttpRequests = useRef<AbortController[]>([])
    const [trigger, setTrigger] = useState<boolean>(false)
    const [data, setData] = useState<any>()
    const [error, setError] = useState<AxiosError | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const responseStatus = useRef<number | null>(null)

    const triggerHttpReq = useCallback(() => setTrigger(true), [])

    const fetcher = useCallback(async () => {
        const httpAbortCtrl = new AbortController()
        activeHttpRequests.current.push(httpAbortCtrl)

        const options = {
            signal: httpAbortCtrl.signal,
        };

        let response: AxiosResponse;
        switch (method) {
            case 'GET':
                response = await axiosClient.get(endpoint, { params, ...options });
                break;
            case 'POST':
                response = await axiosClient.post(endpoint, body, options);
                break;
            case 'DELETE':
                response = await axiosClient.delete(endpoint, options);
                break;
            case 'PUT':
                response = await axiosClient.put(endpoint, body, options);
                break;
            case 'PATCH':
                response = await axiosClient.patch(endpoint, body, options);
                break;
            default:
                throw new Error(`Unsupported HTTP method: ${method}`);
        }

        activeHttpRequests.current = activeHttpRequests.current.filter(reqCtrl => reqCtrl !== httpAbortCtrl)
        return response
    }, [endpoint, body, params])

    useEffect(() => {
        return () => {
            activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort())
        }
    }, []);

    useEffect(() => {
        const innerFetcher = async () => {
            try {
                setIsLoading(true)
                responseStatus.current = null
                const res = await fetcher()
                if (res) {
                    setData(res.data)
                    responseStatus.current = res.status
                }
            } catch (error: any) {
                setError(error)
            } finally {
                setIsLoading(false)
                setTrigger(false)
            }
        }
        trigger && innerFetcher()
    }, [trigger]);

    useEffect(() => {
        error && console.log(error)
    }, [error]);

    return {
        data, error, isLoading, triggerHttpReq, responseStatus: responseStatus.current
    }
}

export default useHttpClient;