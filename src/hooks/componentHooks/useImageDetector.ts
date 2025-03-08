import { Dispatch, useState } from 'react'
import { AxiosError } from 'axios';
import { toast } from '@/components/ui/use-toast';
import useHttpClient from '../useHttpClient';
import { Ingredient } from '@/lib/types';

type UseImageDetectorResponse = {
    base64Image: string;
    setBase64Image: Dispatch<React.SetStateAction<string>>;
    handleTriggerImageDetect: () => void;
    isLoading: boolean;
    ingredientResults: Ingredient[] | null;
}

const useImageDetector = (): UseImageDetectorResponse => {
    const [base64Image, setBase64Image] = useState<string>('')

    const { data, ...imageDetect } = useHttpClient<Ingredient[]>({
        endpoint: '/ingredients/image-detect',
        method: 'POST',
        body: { imageUrl: base64Image },
        onError: (error: AxiosError) => {
            console.log('wrrr');
            setBase64Image('');
            toast({
                variant: 'destructive',
                title: 'Oops! Something went wrong!',
                //@ts-expect-error
                description: error.response?.data?.message || 'An error occurred while processing your image.'
            });
        },
        onSuccess: (data) => {
            if (data.length === 0) setBase64Image('');
        }
    });

    return {
        ingredientResults: data || null,
        base64Image,
        setBase64Image,
        handleTriggerImageDetect: imageDetect.triggerHttpReq,
        isLoading: imageDetect.isLoading,
    }
}

export default useImageDetector