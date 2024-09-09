import IngredientsTabs from '@/components/IngredientsTabs';
import IngredientSearchBar from '@/components/IngredientSearchBar';
import IngredientListContextProvider from '@/context/ingredient-list-context';

const ChooseIngredients: React.FC = () => {

    return (
        <IngredientListContextProvider>
            <div className='flex-1 flex flex-col items-center'>
                <h1 className='text-3xl mb-5 text-center'>Add the ingredients you have at home.</h1>
                <IngredientSearchBar />
                <IngredientsTabs />
            </div>
        </IngredientListContextProvider>
    )
}

export default ChooseIngredients