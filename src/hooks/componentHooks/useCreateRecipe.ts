import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useSSE from '../useSSE'
import { Meals, Recipe, RecipeState } from '@/lib/types'
import { toast } from '@/components/ui/use-toast'

type CreateRecipeState = {
    mealSelected: Meals,
    selectedTime: number,
    prompt: string,
    numOfPeople: number,
}

const useCreateRecipe = ({ mealSelected, selectedTime, prompt, numOfPeople }: CreateRecipeState) => {
    const navigate = useNavigate()

    const [recipe, setRecipe] = useState<RecipeState | null>(null)
    const [isLoadingRecipe, setIsLoadingRecipe] = useState<boolean>(false)
    const [isLoadingImage, setIsLoadingImage] = useState<boolean>(false)

    const { stream, error, triggerStream, clearStreamAndError } = useSSE('/user/recipes/create', {
        mealSelected,
        selectedTime,
        prompt,
        numOfPeople
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
            navigate('/create-new-recipe')
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

export default useCreateRecipe;