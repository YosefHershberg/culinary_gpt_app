import { useQueryClient, useMutation } from "@tanstack/react-query";
import { addMultipleIngredients } from "@/services/ingredient.service";
import { toast } from "@/components/ui/use-toast";
import { Ingredient } from "@/lib/types";

const useOptAddMultipleIngredients = () => {
    const queryClient = useQueryClient();

    const addMultipleIngredientsMutation = useMutation({
        mutationFn: (ingredients: Ingredient[]) => addMultipleIngredients(ingredients),

        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey: ['userIngredients'] });
            const previousCachedData = queryClient.getQueryData<Ingredient[]>(['userIngredients']) as Ingredient[];

            const commonUserIngredients = queryClient.getQueryData<Ingredient[]>(['common-ingredient-suggestions']) || [];

            //using a set for faster lookup. O(n) instead of O(n^2)
            const userIngredientIds = new Set(previousCachedData.map((ingredient: Ingredient) => ingredient.id));

            const missingIngredients = commonUserIngredients.filter(
                (ingredient: Ingredient) => !userIngredientIds.has(ingredient.id)
            );

            queryClient.setQueryData(['userIngredients'], [...previousCachedData, ...missingIngredients]);

            return { previousCachedData };
        },

        onSuccess: () => {
            toast({
                variant: "default",
                title: "Your ingredients added successfully",
            });
        },

        onError: (error: Error, _variables: any, context: any) => {
            queryClient.setQueryData(['userIngredients'], context?.previousCachedData);
            toast({
                variant: "destructive",
                title: "Oops! Something went wrong!",
                //@ts-expect-error
                description: error.response?.data?.message || "An error occurred while deleting ingredients.",
            });
        },

        onSettled: () => queryClient.invalidateQueries({ queryKey: ['userIngredients'] }),
    });

    return addMultipleIngredientsMutation;
};

export default useOptAddMultipleIngredients;
