import { createContext, useContext, useState, useCallback, useMemo } from "react";
import LoadingRecipePage from "@/pages/LoadingRecipePage";
import { toast } from "@/components/ui/use-toast";
import { useUserData } from "./user-data-context";
import useCreateRecipeStream from "@/hooks/componentHooks/useCreateItemStream";
import { Meals, RecipeState, RecipeWithImage } from "@/lib/types";
import { useNavigate } from "@tanstack/react-router";

type CreateRecipeContextValue = {
    mealSelected: Meals;
    selectedTime: number;
    numOfPeople: number;
    recipe: RecipeWithImage | null;
    isLoading: boolean;
    handleMealSelected: (value: Meals) => void;
    handleTimeChange: (value: number[]) => void;
    handleSubmit: (prompt: string) => void;
    handleNumOfPeopleChange: (value: number) => void;
};

const initialRecipeState: RecipeState = {
    mealSelected: 'lunch',
    selectedTime: 50,
    prompt: '',
    numOfPeople: 2
};

export const CreateRecipeContext = createContext<CreateRecipeContextValue | undefined>(undefined);

export const CreateRecipeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const navigate = useNavigate();
    const { userIngredients } = useUserData();

    const [recipeState, setRecipeState] = useState<RecipeState>(initialRecipeState);

    const { trigger, item: newRecipe, isLoadingItem } = useCreateRecipeStream<RecipeState>({
        endpoint: '/user/recipes/create',
        params: recipeState,
        onSuccess: (newRecipe) => {
            setRecipeState(initialRecipeState);
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

    const handleNumOfPeopleChange = useCallback((value: number) => {
        setRecipeState(prev => ({ ...prev, numOfPeople: value }));
    }, []);

    const handleMealSelected = useCallback((value: Meals) => {
        setRecipeState(prev => ({ ...prev, mealSelected: value }));
    }, []);

    const handleTimeChange = useCallback((value: number[]) => {
        setRecipeState(prev => ({ ...prev, selectedTime: value[0] }));
    }, []);

    const handleSubmit = useCallback((prompt: string) => {
        const foodIngredients = userIngredients.filter(ingredient => ingredient.type?.includes('food'));
        if (foodIngredients.length < 4) {
            return toast({
                variant: 'destructive',
                title: 'Oops! You need more ingredients!',
                description: 'You need at least 4 ingredients to create a recipe.'
            });
        }

        if (recipeState.numOfPeople < 1) {
            return toast({
                variant: 'destructive',
                title: 'Oops! You need more people!',
                description: 'You need at least 1 person to create a recipe.'
            });
        }

        setRecipeState(prev => ({ ...prev, prompt }));

        trigger();
    }, [userIngredients, recipeState.numOfPeople, trigger]);

    const contextValue = useMemo(() => ({
        mealSelected: recipeState.mealSelected,
        selectedTime: recipeState.selectedTime,
        numOfPeople: recipeState.numOfPeople,
        recipe: newRecipe,
        isLoading: isLoadingItem,
        handleMealSelected,
        handleTimeChange,
        handleSubmit,
        handleNumOfPeopleChange,
    }), [
        recipeState.mealSelected,
        recipeState.selectedTime,
        recipeState.numOfPeople,
        newRecipe,
        isLoadingItem,
    ]);

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