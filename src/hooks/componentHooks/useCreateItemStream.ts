import { useEffect, useState } from 'react';
import useSSE from '../useSSE';

import type { Recipe, RecipeWithImage } from '@/lib/types';

type UseCreateItemStreamProps = {
    endpoint: string;
    onSuccess?: (item: RecipeWithImage) => void;
    onError?: (error: Error) => void;
};

const useCreateItemStream = ({
    endpoint, onSuccess, onError
}: UseCreateItemStreamProps) => {
    const [item, setItem] = useState<RecipeWithImage | null>(null);
    const [isLoadingItem, setIsLoadingItem] = useState<boolean>(false);
    const [isLoadingImage, setIsLoadingImage] = useState<boolean>(false);
    const [currentParams, setCurrentParams] = useState<Record<string, any> | null>(null);

    const { stream, error, triggerStream, clearStreamAndError } = useSSE(endpoint, currentParams ?? undefined);

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
    }, [stream]);

    useEffect(() => {
        if (item && onSuccess) {
            onSuccess(item);
        }
    }, [item]);

    useEffect(() => {
        if (error) {
            if (onError) {
                onError(error);
            }
            setIsLoadingImage(false);
            setIsLoadingItem(false);
        }
    }, [error]);

    // Renamed trigger to execute, and it now takes params
    const execute = (params: Record<string, any>) => {
        setCurrentParams(params);
        triggerStream();
        setIsLoadingItem(true);
    };

    return {
        error, execute, item, isLoadingItem, isLoadingImage
    };
};

export default useCreateItemStream;