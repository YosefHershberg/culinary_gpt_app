import { useEffect, useState } from 'react';
import useSSE from '../useSSE';
import { Recipe, RecipeWithImage } from '@/lib/types';
import { toast } from '@/components/ui/use-toast';

type UseCreateItemStreamProps<T extends Record<string, any>> = {
    type: 'recipe' | 'cocktail';
    endpoint: string;
    params: T;
    onSuccess?: (item: RecipeWithImage) => void;
};

const useCreateItemStream = <T extends Record<string, any>>({
    endpoint, params, onSuccess, type
}: UseCreateItemStreamProps<T>) => {
    const [item, setItem] = useState<RecipeWithImage | null>(null);
    const [isLoadingItem, setIsLoadingItem] = useState<boolean>(false);
    const [isLoadingImage, setIsLoadingImage] = useState<boolean>(false);

    const { stream, error, triggerStream, clearStreamAndError } = useSSE(endpoint, params);

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
            toast({
                variant: 'destructive',
                title: 'Oops! Something went wrong!',
                //@ts-expect-error
                description: error?.response?.data?.message || `Failed to create ${type}.`,
            });
            setIsLoadingImage(false);
            setIsLoadingItem(false);
        }
    }, [error]);

    const trigger = () => {
        triggerStream();
        setIsLoadingItem(true);
    };

    return {
        error, trigger, item, isLoadingItem, isLoadingImage
    };
};

export default useCreateItemStream;