import useSSE from '../useSSE'
import { useEffect, useState } from 'react'
import { Recipe, RecipeState } from '@/lib/types'
import { toast } from '@/components/ui/use-toast'

type CreateRecipeState = {
    prompt: string,
}

const useCreateCocktail = ({ prompt }: CreateRecipeState) => {
    const [recipe, setRecipe] = useState<RecipeState | null>(null)
    const [isLoadingRecipe, setIsLoadingRecipe] = useState<boolean>(false)
    const [isLoadingImage, setIsLoadingImage] = useState<boolean>(false)

    const { stream, error, triggerStream, clearStreamAndError } = useSSE('/user/recipes/create-cocktail', {
        prompt,
    })

    useEffect(() => {
        if (stream.length === 0) return
        if (stream[0]?.event === 'recipe') {
            setRecipe({ recipe: stream[0].data as unknown as Recipe, image_url: null })
            setIsLoadingRecipe(false)
            setIsLoadingImage(true)
        }
        if (stream[1]?.event === 'image') {
            setRecipe(prev => prev ? { ...prev, image_url: stream[1].data } : null)
            setIsLoadingImage(false)
            clearStreamAndError()
        }
    }, [stream]);

    useEffect(() => {
        if (error) {
            setIsLoadingRecipe(false)
            toast({
                variant: 'destructive',
                title: 'Oops! Something went wrong!',
                //@ts-ignore
                description: error.response?.data?.message || 'An error occurred while creating your recipe.'
            })
            clearStreamAndError()
        }
    }, [error]);

    const trigger = () => {
        triggerStream()
        setIsLoadingRecipe(true)
    }

    return {
        error, trigger, recipe, isLoadingRecipe, isLoadingImage
    }
}

export default useCreateCocktail;