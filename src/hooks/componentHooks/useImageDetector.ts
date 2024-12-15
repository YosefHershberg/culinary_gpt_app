import { Dispatch, useEffect, useState } from 'react'
import { toast } from '@/components/ui/use-toast';
import useHttpClient from '../useHttpClient';
import { Ingredient } from '@/lib/types';

type UseImageDetectorResponse = {
    base64Image: string;
    setBase64Image: Dispatch<React.SetStateAction<string>>;
    handleTriggerImageDetect: () => void;
    isLoading: boolean;
    ingredientResults: Ingredient[];
}

const useImageDetector = (): UseImageDetectorResponse => {
    const [base64Image, setBase64Image] = useState<string>('')

    const { data, ...imageDetect } = useHttpClient({
        endpoint: '/ingredients/image-detect',
        method: 'POST',
        body: { imageUrl: base64Image }
    });

    useEffect(() => {
        if (imageDetect.error) {
            setBase64Image('');
            toast({
                variant: 'destructive',
                title: 'Oops! Something went wrong!',
                //@ts-expect-error
                description: imageDetect.error.response?.data?.message || 'An error occurred while processing your image.'
            });
        }
    }, [imageDetect.error]);

    useEffect(() => {
        if (data && data.length === 0) setBase64Image('');
    }, [data]);

    return {
        ingredientResults: data || null,
        base64Image,
        setBase64Image,
        handleTriggerImageDetect: imageDetect.triggerHttpReq,
        isLoading: imageDetect.isLoading,
    }
}

export default useImageDetector