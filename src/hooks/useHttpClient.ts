import { useRef, useEffect, useState, useCallback } from 'react';
import { AxiosError } from 'axios';

// Accepts an object with a fn property (API function) and options
const useHttpClient = <TResponse, TArgs extends any[]>(
    {
        fn: apiFn,
        onSuccess,
        onError
    }: {
        fn: (...args: TArgs) => Promise<TResponse>;
        onSuccess?: (data: TResponse) => void;
        onError?: (error: AxiosError) => void;
    }
) => {
    const activeHttpRequests = useRef<AbortController[]>([]);
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

    const execute = useCallback(async (...args: TArgs) => {
        const httpAbortCtrl = new AbortController();
        activeHttpRequests.current.push(httpAbortCtrl);
        setState((prev) => ({ ...prev, isLoading: true, error: null }));
        try {
            const res = await apiFn(...args);
            setState((prev) => ({
                ...prev,
                data: res as any,
                responseStatus: (res as any)?.status || null,
            }));
            onSuccess && onSuccess(res);
            return res;
        } catch (error: any) {
            setState((prev) => ({ ...prev, error }));
            onError && onError(error);
            throw error;
        } finally {
            setState((prev) => ({ ...prev, isLoading: false }));
            activeHttpRequests.current = activeHttpRequests.current.filter(
                (reqCtrl) => reqCtrl !== httpAbortCtrl,
            );
        }
    }, [apiFn, onSuccess, onError]);

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
        execute,
        responseStatus: state.responseStatus,
    };
};

export default useHttpClient;