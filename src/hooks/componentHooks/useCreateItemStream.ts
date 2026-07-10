import { useEffect, useRef, useState } from 'react';
import useSSE from '../useSSE';

import type { Recipe, RecipeWithImage } from '@/lib/types';

type UseCreateItemStreamProps = {
    endpoint: string;
    onSuccess?: (item: RecipeWithImage) => void;
    onError?: (error: Error) => void;
    onExecute?: (item: RecipeWithImage) => void
};

const useCreateItemStream = ({
    endpoint, onSuccess, onError, onExecute
}: UseCreateItemStreamProps) => {
    const [item, setItem] = useState<RecipeWithImage | null>(null);
    const [isLoadingItem, setIsLoadingItem] = useState<boolean>(false);
    const [isLoadingImage, setIsLoadingImage] = useState<boolean>(false);

    const { stream, error, executeStream, clearStreamAndError } = useSSE(endpoint);

    // Keep the latest callbacks in refs so the effects below can depend only on
    // the values that should trigger them (item/error) without re-firing when a
    // parent re-renders and passes new callback identities.
    const onSuccessRef = useRef(onSuccess);
    const onErrorRef = useRef(onError);
    useEffect(() => {
        onSuccessRef.current = onSuccess;
        onErrorRef.current = onError;
    }, [onSuccess, onError]);

    useEffect(() => {
        if (stream.length === 0) return;
        if (stream[0]?.event === 'recipe') {
            setItem({ recipe: stream[0].payload as unknown as Recipe, image_url: null });
            setIsLoadingItem(false);
            setIsLoadingImage(true);
        }
        if (stream[1]?.event === 'image') {
            setItem(prev => prev ? { ...prev, image_url: stream[1].payload } : null);
            setIsLoadingImage(false);
            clearStreamAndError();
        }
    }, [stream, clearStreamAndError]);

    useEffect(() => {
        if (item) {
            onSuccessRef.current?.(item);
        }
    }, [item]);

    useEffect(() => {
        if (error) {
            onErrorRef.current?.(error);
            setIsLoadingImage(false);
            setIsLoadingItem(false);
        }
    }, [error]);

    const execute = (params: Record<string, unknown>) => {
        onExecute && onExecute(item as RecipeWithImage);
        executeStream(params);
        setIsLoadingItem(true);
    };

    return {
        error, execute, item, isLoadingItem, isLoadingImage
    };
};

export default useCreateItemStream;