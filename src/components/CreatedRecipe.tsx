import { useCreateRecipe } from '@/context-providers/create-recipe-provider';
import useHttpClient from '@/hooks/useHttpClient';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from './ui/use-toast';
import RecipePage from '@/pages/RecipePage';
import { Button } from './ui/button';
import LoadingSpinner from './ui/LaodingSpinner';

const CreatedRecipe: React.FC = () => {
    const { createdRecipe } = useCreateRecipe()
    const navigate = useNavigate()

    const { responseStatus, isLoading, error, triggerHttpReq } = useHttpClient({
        endpoint: '/user/recipes',
        method: 'POST',
        body: createdRecipe
    })

    useEffect(() => {
        if (responseStatus === 200) {
            navigate('/my-recipes')
        }
        if (error) {
            toast({
                variant: 'destructive',
                title: 'Oops! Something went wrong!',
                //@ts-ignore
                description: error.response?.data?.message || 'An error occurred while adding your recipe to My Recipes.'
            })
        }
    }, [responseStatus, error])

    const handleAddToMyRecipes = () => {
        triggerHttpReq()
        // navigate('/create-new-recipe')
    }


    return (
        <RecipePage
            createdRecipe={createdRecipe}
            buttonComponent={
                <Button
                    onClick={handleAddToMyRecipes}
                    variant='secondary'
                    className='absolute bottom-5 sm:left-5 left-1/2 transform sm:-translate-x-0 -translate-x-1/2 w-42 h-12 rounded-full px-5 hover:scale-105 transition duration-300 ease-in-out'
                >
                    {
                        isLoading ? <LoadingSpinner /> : 'Add to My Recipes'
                    }
                </Button>
            }
        />
    );
};

export default CreatedRecipe;