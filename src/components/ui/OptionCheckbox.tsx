import { Checkbox } from "@/components/ui/checkbox";
import { Ingredient } from "@/lib/types";
import { useContext } from "react";
import { HanldeIngredientClickContext } from "../IngredientsTabs";
import { useUserIngredients } from "@/context-providers/user-ingredients-provider";

type OptionCheckboxProps = {
  ingredient: Ingredient,
}

const OptionCheckbox: React.FC<OptionCheckboxProps> = ({ ingredient }) => {
  const { handleClicked } = useContext(HanldeIngredientClickContext)
  const { userIngredients } = useUserIngredients() //NOTE: is creating this here the best practice?

  return (
    <div
      className={"flex items-center gap-2 h-10 px-3 bg-zinc-200 dark:bg-zinc-700 rounded shadow-md"}
      onClick={() => handleClicked(ingredient)}
    >
      <Checkbox id={ingredient.name.toLowerCase().replace(/\s/g, '_')} checked={!!userIngredients.find(item => item.name === ingredient.name)} />
      <label
        htmlFor={ingredient.name.toLowerCase().replace(/\s/g, '_')}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {ingredient.name}
      </label>
    </div>
  )
}


export { OptionCheckbox }

