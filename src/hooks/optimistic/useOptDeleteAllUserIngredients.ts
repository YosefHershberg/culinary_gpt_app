import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteAllUserIngredients } from "@/services/ingredient.service";
import { toast } from "@/components/ui/use-toast";
import { Ingredient } from "@/lib/types";

const useOptDeleteAllUserIngredients = () => {
    const queryClient = useQueryClient();

    const deleteAllUserIngredientsMutation = useMutation({
        mutationFn: () => deleteAllUserIngredients(),

        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey: ['userIngredients'] });
            const previousCachedData = queryClient.getQueryData<Ingredient[]>(['userIngredients']) as Ingredient[];

            queryClient.setQueryData(['userIngredients'], []);
            return { previousCachedData };
        },

        onSuccess: () => {
            toast({
                variant: "default",
                title: "All ingredients deleted successfully",
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

    return deleteAllUserIngredientsMutation;
};

export default useOptDeleteAllUserIngredients;
