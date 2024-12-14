import { Checkbox } from "@/components/ui/checkbox";
import { Ingredient } from "@/lib/types";
import { useIngredientList } from "@/context/ingredient-list-context";

type OptionCheckboxProps = {
  ingredient: Ingredient,
}

const OptionCheckbox: React.FC<OptionCheckboxProps> = ({ ingredient }) => {
  const { handleClicked, userIngredientsSet } = useIngredientList()

  return (
    <label
      htmlFor={ingredient.id as string}
      className={"cursor-pointer flex items-center h-10 px-3 bg-zinc-200 dark:bg-zinc-700 rounded shadow-md"}
    >
      <Checkbox
        onCheckedChange={() => handleClicked(ingredient)}
        id={ingredient.id as string}
        checked={userIngredientsSet.has(ingredient.id)}
      />
      <span className="cursor-pointer pl-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {ingredient.name}
      </span>
    </label>
  )
}


export { OptionCheckbox }

