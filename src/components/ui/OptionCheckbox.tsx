import { Checkbox } from "@/components/ui/checkbox";
import { Ingredient } from "@/lib/types";
import { useContext } from "react";
import { HandleIngredientClickContext } from "../IngredientsTabs";
import { useUserData } from "@/context/user-data-provider";

type OptionCheckboxProps = {
  ingredient: Ingredient,
}

const OptionCheckbox: React.FC<OptionCheckboxProps> = ({ ingredient }) => {
  const { handleClicked } = useContext(HandleIngredientClickContext)
  const { userIngredients } = useUserData()

  return (
    <div
      className={"cursor-pointer flex items-center h-10 px-3 bg-zinc-200 dark:bg-zinc-700 rounded shadow-md"}
    >
      <Checkbox
        onCheckedChange={() => handleClicked(ingredient)}
        id={ingredient.name.toLowerCase().replace(/\s/g, '_')}
        checked={userIngredients?.some(item => item.id === ingredient.id)}
      />
      <label
        htmlFor={ingredient.name.toLowerCase().replace(/\s/g, '_')}
        className="cursor-pointer pl-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {ingredient.name}
      </label>
    </div>
  )
}


export { OptionCheckbox }

