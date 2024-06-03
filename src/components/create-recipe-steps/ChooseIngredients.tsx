import IngredientsTabs from '@/components/IngredientsTabs';
import IngredientSearchbar from '@/components/IngredientSearchbar';

const ChooseIngredients = () => {
    return (
        <div className='flex-1 flex flex-col items-center'>
            <h1 className='text-3xl mb-5 text-center'>Add the ingredients you have at home.</h1>
            <IngredientSearchbar />
            <IngredientsTabs />
        </div>
    )
}

export default ChooseIngredients