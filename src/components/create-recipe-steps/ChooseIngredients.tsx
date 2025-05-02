import IngredientsTabs from '@/components/create-components/IngredientsTabs';
import IngredientSearchBar from '@/components/create-components/IngredientSearchBar';
import IngredientListContextProvider from '@/context/ingredient-list-context';
import { IngredientCategoriesMap } from './IngredientsCategoriesMap';
import AddCommonIngredientModal from '../modals/AddCommonIngredientModal';

const placeholders = [
    "Cocoa Powder",
    "Peanut Butter",
    "Canola oil",
    "Barbecue Sauce",
    "Pita Bread",
];

const ChooseIngredients: React.FC = () => {
    
    return (
        <IngredientListContextProvider>
            <div className='flex-1 flex flex-col items-center'>
                <h1 className='sm:text-3xl text-2xl font-bold mb-5 text-balance text-center'>Add the ingredients you have at home.</h1>
                <IngredientSearchBar 
                    placeholders={placeholders}
                    type='food'
                />
                <IngredientsTabs 
                    categoryMap={IngredientCategoriesMap}
                />
            </div>
            <AddCommonIngredientModal />
        </IngredientListContextProvider>
    )
}

export default ChooseIngredients