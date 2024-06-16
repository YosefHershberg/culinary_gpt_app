import { Recipe } from '@/lib/types'

interface RecipePageProps {
    createdRecipe: Recipe
    buttonComponent?: JSX.Element
}

const RecipePage = ({ createdRecipe, buttonComponent }: RecipePageProps) => {

    return (
        <main className='flex flex-col w-screen items-center bg-amber-100 pb-5'>
            <div className='max-w-[50rem] flex flex-col items-center bg-orange/20 py-5 px-10 rounded-2xl m-5'>

                <div className='flex flex-col items-center '>
                    <h2 className='text-2xl font-semibold text-center'>{createdRecipe.recipe.title}</h2>
                    <p className='text-lg text-center mt-4'>{createdRecipe.recipe.description}</p>
                </div>
                <div className='flex flex-col items-center mt-8'>
                    <img
                        src={createdRecipe.image_url}
                        alt={createdRecipe.recipe.title}
                        className='max-h-80 object-cover rounded-lg aspect-square'
                    />
                </div>
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
            <h1 className='font-bold sm:text-6xl text-5xl italic text-amber-800'>
                Bon Apetite!
            </h1>
            {buttonComponent}
        </main>
    )
}

export default RecipePage