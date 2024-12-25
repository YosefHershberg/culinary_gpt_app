import { useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Lottie from 'lottie-react'

import { RecipeWithImage } from '@/lib/types'

import ShareRecipeModal from '@/components/modals/ShareRecipeModal'
import { Button } from '@/components/ui/button'
import { Share2 } from 'lucide-react'

import loadingRecipeAnimation from '@/assets/animations/loading-page-animation.json'

type RecipePageProps = {
    createdRecipe: RecipeWithImage
    addToRecipesBtn?: JSX.Element
}

const RecipePage: React.FC<RecipePageProps> = ({ createdRecipe, addToRecipesBtn }) => {
    const navigate = useNavigate()

    useLayoutEffect(() => {
        if (!createdRecipe) navigate('/create-new-recipe')
    }, []);

    if (createdRecipe) return (
        <main className='flex flex-col w-screen items-center bg-amber-100 dark:bg-zinc-700 pb-5'>
            <div className='max-w-[50rem] flex flex-col items-center bg-orange/20 py-5 px-10 rounded-2xl m-5'>

                <div className='flex flex-col items-center '>
                    <h2 className='text-2xl font-semibold text-center'>{createdRecipe.recipe.title}</h2>
                    <p className='text-lg text-center mt-4'>{createdRecipe.recipe.description}</p>
                </div>
                <div className='sm:size-[25rem] rounded-lg flex flex-col items-center mt-8 bg-transparent/10'>
                    {createdRecipe.image_url ?
                        <img
                            src={createdRecipe.image_url}
                            alt={createdRecipe.recipe.title}
                            className='size-full object-cover rounded-lg aspect-square'
                        /> :
                        <Lottie animationData={loadingRecipeAnimation} className='size-full p-10' />
                    }
                </div>
                {!createdRecipe.image_url &&
                    <p className='text-lg text-center mt-4'>Loading image. One moment please...</p>
                }
                <div className='flex flex-col items-center mt-10'>
                    <h3 className='text-2xl font-semibold'>Ingredients</h3>
                    <ul className='list-disc mt-2 sm:grid grid-cols-2 gap-x-10'>
                        {createdRecipe.recipe.ingredients.map(i => (
                            <li className='mt-2' key={i.ingredient}>{i.ingredient}</li>
                        ))}
                    </ul>
                </div>
                <div className='flex flex-col items-center mt-10'>
                    <h3 className='text-2xl font-semibold'>Instructions</h3>
                    <ol className='list-decimal mt-2'>
                        {createdRecipe.recipe.steps.map(step => (
                            <li className='mt-2' key={step.step}>{step.step}</li>
                        ))}
                    </ol>
                </div>

            </div>
            <h1 className='font-bold sm:mb-0 mb-[4rem] sm:text-6xl text-5xl italic text-amber-800 dark:text-amber-600'>
                Bon Apetite!
            </h1>
            <div className='fixed w-full px-5 bottom-5 flex sm:justify-between justify-center gap-5'>
                {!addToRecipesBtn &&
                    <ShareRecipeModal>
                        <Button
                            variant='secondary'
                            className='min-w-[8rem] flex items-center gap-2 h-12 rounded-full px-5 hover:scale-105 transition duration-300 ease-in-out'
                        >
                            Share <Share2 className='size-4' />
                        </Button>
                    </ShareRecipeModal>
                }
                {addToRecipesBtn}
            </div>
        </main>

    )
}

export default RecipePage