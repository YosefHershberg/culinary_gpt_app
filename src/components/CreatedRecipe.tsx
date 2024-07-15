import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import LoadingSpinner from '@/components/ui/LaodingSpinner';

import { useCreateRecipe } from '@/context/create-recipe-provider';
import useHttpClient from '@/hooks/useHttpClient';
import RecipePage from '@/pages/RecipePage';
import { Recipe } from '@/lib/types';

const CreatedRecipe: React.FC = () => {
    const { createdRecipe } = useCreateRecipe()
    const navigate = useNavigate()

    const { responseStatus, isLoading, error, triggerHttpReq } = useHttpClient({
        endpoint: '/user/recipes',
        method: 'POST',
        body: createdRecipe
    })

    useEffect(() => {
        if (responseStatus === 200) navigate('/my-recipes')

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
    }

    return (
        <RecipePage
            createdRecipe={createdRecipe as Recipe}
            buttonComponent={
                <Button
                    onClick={handleAddToMyRecipes}
                    variant='secondary'
                    className='min-w-[8rem] h-12 rounded-full px-5 hover:scale-105 transition duration-300 ease-in-out'
                >
                    {isLoading ?
                        <LoadingSpinner className='size-5' />
                        : 'Add to My Recipes'
                    }
                </Button>
            }
        />
    );
};

export default CreatedRecipe;