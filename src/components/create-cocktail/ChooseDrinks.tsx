import IngredientListContextProvider from "@/context/ingredient-list-context"
import IngredientSearchBar from "@/components/create-components/IngredientSearchBar"
import DrinksTabs from "./DrinksTabs";

const placeholders = [
  'Vodka',
  'Rum',
  'Gin',
  'Tequila',
  'Whiskey',
  'Bourbon',
];

const ChooseDrinks: React.FC = () => {
  return (
    <IngredientListContextProvider>
      <div className='flex-1 flex flex-col items-center'>
        <h1 className='sm:text-3xl text-2xl font-bold mb-5 text-balance text-center'>What cocktail ingredients do you have?</h1>
        <IngredientSearchBar
          placeholders={placeholders}
          type='drink'
        />
        <DrinksTabs />
      </div>
    </IngredientListContextProvider>
  )
}

export default ChooseDrinks