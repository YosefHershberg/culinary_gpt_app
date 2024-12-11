import { toast } from '@/components/ui/use-toast';
import { Dispatch, useEffect, useRef, useState } from 'react'
import useHttpClient from '../useHttpClient';
import { useUserData } from '@/context/user-data-context';
import { Ingredient } from '@/lib/types';

type UseImageDetectorResponse = {
    base64Image: string;
    setBase64Image: Dispatch<React.SetStateAction<string>>;
    handleTriggerImageDetect: () => void;
    ingredientResults: any;
    isLoading: boolean;
    handleAddIngredientsFromImage: () => void;
    clearImageDetector: () => void;
}

const useImageDetector = (): UseImageDetectorResponse => {
    const [base64Image, setBase64Image] = useState<string>('')
    const { addMultipleIngredients } = useUserData();

    const { data, ...imageDetect } = useHttpClient({
        endpoint: '/ingredients/image-detect',
        method: 'POST',
        body: { imageUrl: base64Image }
    });

    const ingredientResultsRef = useRef<undefined | Ingredient[]>();

    useEffect(() => {
        if (imageDetect.error) {
            setBase64Image('');
            toast({
                variant: 'destructive',
                title: 'Oops! Something went wrong!',
                //@ts-expect-error
                description: error.response?.data?.message || 'An error occurred while processing your image.'
            });
        }
    }, [imageDetect.error]);

    useEffect(() => {
        if (data) {
            ingredientResultsRef.current = data;
            setBase64Image('');
        }
    }, [data])

    const handleAddIngredientsFromImage = () => {
        if (ingredientResultsRef.current && ingredientResultsRef.current?.length > 0) {
            addMultipleIngredients(ingredientResultsRef.current);
        }
    }

    const clearImageDetector = () => {
        setBase64Image('');
        ingredientResultsRef.current = undefined;
    }

    return {
        base64Image,
        setBase64Image,
        handleTriggerImageDetect: imageDetect.triggerHttpReq,
        ingredientResults: ingredientResultsRef.current,
        isLoading: imageDetect.isLoading,
        handleAddIngredientsFromImage,
        clearImageDetector
    }
}

export default useImageDetector