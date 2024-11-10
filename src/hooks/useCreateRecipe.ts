import { Meals } from '@/context/create-recipe-context'
import useSSE from './useSSE'
import { useEffect, useState } from 'react'
import { Recipe } from '@/lib/types'

type CreateRecipeState = {
    mealSelected: Meals,
    selectedTime: number,
    prompt: string,
    numOfPeople: number,
}

export type RecipeState = {
    recipe: Recipe,
    image_url: string | null,
    id?: number | string, 
}

const useCreateRecipe = ({ mealSelected, selectedTime, prompt, numOfPeople }: CreateRecipeState) => {
    const [recipe, setRecipe] = useState<RecipeState | null>(null)
    const [isLoadingRecipe, setIsLoadingRecipe] = useState<boolean>(false)
    const [isLoadingImage, setIsLoadingImage] = useState<boolean>(false)

    const { stream, error, triggerStream, clearStream } = useSSE('/user/recipes/create', {
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
            clearStream()
        }
    }, [stream]);

    useEffect(() => {
        if (error) {
            setIsLoadingRecipe(false)
            console.error(error)
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