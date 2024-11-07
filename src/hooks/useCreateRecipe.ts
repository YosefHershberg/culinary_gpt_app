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

const useCreateRecipeStream = ({ mealSelected, selectedTime, prompt, numOfPeople }: CreateRecipeState) => {
    const [recipe, setRecipe] = useState<Recipe | null>(null)
    const [recipeImage, setRecipeImage] = useState<string | null>(null)
    const [isLoadingRecipe, setIsLoadingRecipe] = useState<boolean>(false)
    const [isLoadingImage, setIsLoadingImage] = useState<boolean>(false)

    const { stream, error, triggerStream } = useSSE('/stream', {
        meal: mealSelected,
        time: selectedTime,
        prompt,
        numOfPeople
    })

    useEffect(() => {
        if (stream.length > 0) console.log(stream)
        if (stream.length === 0) return
        if (stream[0]?.event === 'recipe') {
            //@ts-ignore
            setRecipe(stream[0].data as Recipe)
            setIsLoadingRecipe(false)
            setIsLoadingImage(true)
        }
        if (stream[1]?.event === 'image') {
            setRecipeImage(stream[1].data as string)
            setIsLoadingImage(false)
        }
    }, [stream]);

    useEffect(() => {
        console.log(isLoadingImage, isLoadingRecipe);
    }, [isLoadingImage, isLoadingRecipe]);

    const trigger = () => {
        triggerStream()
        setIsLoadingRecipe(true)
    }

    return {
        error, trigger, recipe, isLoadingRecipe, recipeImage, isLoadingImage
    }
}

export default useCreateRecipeStream