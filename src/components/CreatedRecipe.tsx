import React from 'react';

import { Button } from '@/components/ui/button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

import RecipePage from '@/pages/RecipePage';
import { useCreateRecipe } from '@/context/create-recipe-context';
import { RecipeState } from '@/hooks/useCreateRecipe';
import useSaveRecipe from '@/hooks/useSaveRecipe';
import { RecipeWithImage } from '@/lib/types';

const CreatedRecipe: React.FC = () => {
    const { recipe } = useCreateRecipe()
    const { isLoading, handleSaveRecipe } = useSaveRecipe(recipe as RecipeWithImage)

    return (
        <RecipePage
            createdRecipe={recipe as RecipeState}
            addToRecipesBtn={
                <Button
                    disabled={!recipe?.image_url}
                    onClick={handleSaveRecipe}
                    variant='secondary'
                    className='min-w-[8rem] h-12 rounded-full px-5 hover:scale-105 transition duration-300 ease-in-out disabled:cursor-not-allowed'
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