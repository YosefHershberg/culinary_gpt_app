import React from 'react';
import { useLocation } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

import RecipePage from '@/pages/RecipePage';
import useSaveRecipe from '@/hooks/componentHooks/useSaveRecipe';
import { RecipeWithImage } from '@/lib/types';

const CreatedRecipe: React.FC = () => {
    const recipe = useLocation().state as RecipeWithImage
    const { isLoading, handleSaveRecipe } = useSaveRecipe(recipe)

    return (
        <RecipePage
            createdRecipe={recipe}
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