import React from "react";
import { DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { IngredientResultsState } from "@/hooks/componentHooks/useAddImageIngredients";

type DetectedIngredientsListProps = {
  ingredientResults: IngredientResultsState[] | null;
  handleCheckAllIngredients: () => void;
  handleRemoveAllIngredients: () => void;
  handleChangeChecked: (index: number) => void;
  handleAddIngredientsFromImage: () => void;
  clearImageDetector: () => void;
}

export const DetectedIngredientsList: React.FC<DetectedIngredientsListProps> = ({
  ingredientResults,
  handleCheckAllIngredients,
  handleRemoveAllIngredients,
  handleChangeChecked,
  handleAddIngredientsFromImage,
  clearImageDetector,
}) => (
  <div className="flex flex-col items-center mx-3">
    <DialogTitle className="text-center">Ingredients detected</DialogTitle>
    <DialogDescription className="text-center mt-3">
      The following ingredients were detected in the image.
    </DialogDescription>
    <div className="flex items-start w-full my-3 ml-5">
      <label htmlFor="all" className="flex items-center gap-3">
        <Checkbox
          id="all"
          onCheckedChange={(e) => (e ? handleCheckAllIngredients() : handleRemoveAllIngredients())}
          checked={ingredientResults?.every((ingredient) => ingredient.checked)}
        />
        <h1 className="font-bold">Select all</h1>
      </label>
    </div>
    <div className="w-full flex flex-col items-center h-full">
      <ul className="mt-3 max-h-56 overflow-auto mb-3 w-full">
        {ingredientResults?.map((ingredient, index) => (
          <li key={ingredient.ingredient.id || index} className="flex items-center space-x-2">
            <label
              htmlFor={`ingredient-${index}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center h-10 px-3 gap-2"
            >
              <Checkbox
                id={`ingredient-${index}`}
                onCheckedChange={() => handleChangeChecked(index)}
                checked={ingredient.checked}
              />
              <span>{ingredient.ingredient.name}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
    <DialogFooter>
      <DialogClose asChild>
        <Button
          disabled={ingredientResults?.every((ingredient) => !ingredient.checked)}
          onClick={() => {
            handleAddIngredientsFromImage();
            clearImageDetector();
          }}
        >
          Add Ingredients
        </Button>
      </DialogClose>
    </DialogFooter>
  </div>
);