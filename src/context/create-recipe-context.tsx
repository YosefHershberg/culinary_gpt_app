import { createContext, useContext, useMemo, useCallback } from "react";
import { useUserData } from "./user-data-context";
import { useForm, SubmitHandler } from "react-hook-form";
import useCreateRecipeStream from "@/hooks/componentHooks/useCreateItemStream";
import { useNavigate } from "@tanstack/react-router";

import LoadingRecipePage from "@/pages/LoadingRecipePage";
import { toast } from "@/components/ui/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import type { RecipeWithImage } from "@/lib/types";

export const recipeFormSchema = z.object({
  mealSelected: z.enum(["breakfast", "lunch", "dinner", "snack", "dessert"]),
  selectedTime: z.number().min(10).max(120),
  numOfPeople: z.number().int().positive().min(1).max(99),
  prompt: z.string().max(99).optional().or(z.literal('')),
});

export type RecipeFormValues = z.infer<typeof recipeFormSchema>;

const initialFormValues: RecipeFormValues = {
  mealSelected: "lunch",
  selectedTime: 50,
  numOfPeople: 2,
  prompt: "",
};

type CreateRecipeContextValue = {
  form: ReturnType<typeof useForm<RecipeFormValues>>;
  isLoading: boolean;
  recipe: RecipeWithImage | null;
  onSubmit: SubmitHandler<RecipeFormValues>;
};

export const CreateRecipeContext = createContext<CreateRecipeContextValue | undefined>(undefined);

export const CreateRecipeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const { userIngredients } = useUserData();

  const form = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeFormSchema),
    defaultValues: initialFormValues,
    mode: "onChange",
  });

  const { execute, item: newRecipe, isLoadingItem } = useCreateRecipeStream({
    endpoint: '/user/recipes/create',
    onSuccess: (newRecipe) => {
      form.reset(initialFormValues);
      // prefetch route here
      navigate({
        to: '/recipe',
        state: newRecipe as any,
      });
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Oops! Something went wrong!',
        //@ts-expect-error
        description: error?.response?.data?.message || `Failed to create recipe.`,
      });
    }
  });

  const onSubmit: SubmitHandler<RecipeFormValues> = useCallback((data) => {
    const foodIngredients = userIngredients.filter(ingredient => ingredient.type?.includes('food'));
    if (foodIngredients.length < 4) {
      return toast({
        variant: 'destructive',
        title: 'Oops! You need more ingredients!',
        description: 'You need at least 4 ingredients to create a recipe.'
      });
    }
    if (data.numOfPeople < 1) {
      return toast({
        variant: 'destructive',
        title: 'Oops! You need more people!',
        description: 'You need at least 1 person to create a recipe.'
      });
    }
    execute(data);
  }, [userIngredients, execute]);

  const contextValue = useMemo(() => ({
    form,
    isLoading: isLoadingItem,
    recipe: newRecipe,
    onSubmit,
  }), [form, isLoadingItem, newRecipe, onSubmit]);

  if (isLoadingItem) return <LoadingRecipePage duration={1000} />;

  return (
    <CreateRecipeContext.Provider value={contextValue}>
      {children}
    </CreateRecipeContext.Provider>
  );
};

export const useCreateRecipe = () => {
  const context = useContext(CreateRecipeContext);
  if (context === undefined) {
    throw new Error(
      "useCreateRecipe must be used within a CreateRecipeProvider. " +
      "Make sure your component is wrapped in the provider."
    );
  }
  return context;
};