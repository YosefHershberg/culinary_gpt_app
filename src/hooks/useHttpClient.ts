import { useRef, useEffect, useState, useCallback } from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import axiosClient from '@/config/axiosClient';

type HttpMethod = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH';

type BaseUseHttpClientProps = {
    endpoint: string;
    method: HttpMethod;
    params?: any;
    headers?: any;
    onSuccess?: (data: any) => void;
    onError?: (error: AxiosError) => void;
};

type UseHttpClientProps =
    | (BaseUseHttpClientProps & { method: 'GET' | 'DELETE'; body?: never })
    | (BaseUseHttpClientProps & { method: 'POST' | 'PUT' | 'PATCH'; body: Record<string, any> });

type UseHttpClientResponseType<TResponse> = {
    data: TResponse | null;
    error: AxiosError | null;
    isLoading: boolean;
    triggerHttpReq: () => void;
    responseStatus: number | null;
};

const useHttpClient = <TResponse = any>({
    endpoint,
    method,
    body,
    params,
    headers,
    onSuccess,
    onError,
}: UseHttpClientProps): UseHttpClientResponseType<TResponse> => {
    const activeHttpRequests = useRef<AbortController[]>([]);
    const [trigger, setTrigger] = useState<boolean>(false);

    const [state, setState] = useState<{
        data: TResponse | null;
        error: AxiosError | null;
        isLoading: boolean;
        responseStatus: number | null;
    }>({
        data: null,
        error: null,
        isLoading: false,
        responseStatus: null,
    });

    const triggerHttpReq = () => setTrigger(true);

    const fetcher = useCallback(async () => {
        const httpAbortCtrl = new AbortController();
        activeHttpRequests.current.push(httpAbortCtrl);

        const options = {
            signal: httpAbortCtrl.signal,
            headers,
        };

        let response: AxiosResponse<TResponse>;
        try {
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

            return response;
        } finally {
            activeHttpRequests.current = activeHttpRequests.current.filter(
                (reqCtrl) => reqCtrl !== httpAbortCtrl,
            );
        }
    }, [endpoint, method, body, params, headers]);

    useEffect(() => {
        const innerFetcher = async () => {
            try {
                setState((prev) => ({ ...prev, isLoading: true, error: null }));

                const res = await fetcher();
                if (res) {
                    setState((prev) => ({
                        ...prev,
                        data: res.data,
                        responseStatus: res.status,
                    }));
                }
                onSuccess && onSuccess(res.data);
            } catch (error: AxiosError | any) { //TODO: fix this any
                console.error(error);
                setState((prev) => ({ ...prev, error }));
                onError && onError(error);
            } finally {
                setState((prev) => ({ ...prev, isLoading: false }));
                setTrigger(false);
            }
        };

        if (trigger) {
            innerFetcher();
        }
    }, [trigger]);

    useEffect(() => {
        return () => {
            activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
            activeHttpRequests.current = [];
        };
    }, []);

    return {
        data: state.data,
        error: state.error,
        isLoading: state.isLoading,
        triggerHttpReq,
        responseStatus: state.responseStatus,
    };
};

export default useHttpClient;