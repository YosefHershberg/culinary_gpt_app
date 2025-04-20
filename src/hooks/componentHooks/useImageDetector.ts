import { Dispatch, useState } from 'react'
import { AxiosError } from 'axios';
import { toast } from '@/components/ui/use-toast';
import useHttpClient from '../useHttpClient';
import { detectImageForIngredientsAPI } from '@/services/ingredient.service';
import type { Ingredient } from '@/lib/types';

type UseImageDetectorResponse = {
    base64Image: string;
    setBase64Image: Dispatch<React.SetStateAction<string>>;
    handleTriggerImageDetect: () => void;
    isLoading: boolean;
    ingredientResults: Ingredient[] | null;
}

const useImageDetector = (): UseImageDetectorResponse => {
    const [base64Image, setBase64Image] = useState<string>('')

    const { data, isLoading, execute } = useHttpClient({
        fn: detectImageForIngredientsAPI,
        onError: (error: AxiosError) => {
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
        handleTriggerImageDetect: () => execute(base64Image),
        isLoading,
    };
}

export default useImageDetector