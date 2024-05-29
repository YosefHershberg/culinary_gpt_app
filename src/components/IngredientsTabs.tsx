import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useQuery } from '@tanstack/react-query';
import { getCommonIngredients, getDairyIngredients, getSpicesSuggestions, getVegetablesIngredients } from '@/lib/api';
import { OptionCheckbox } from "@/components/ui/OptionCheckbox";
import LoadingSpinner from "@/components/ui/LaodingSpinner";
import { toast } from "@/components/ui/use-toast"
import { useUserIngredients } from "@/context-providers/user-ingredients-provider";
import { Ingredient } from "@/lib/types";
import { createContext, useState } from "react";

export const HanldeIngredientClickContext = createContext<{ handleClicked: (ingredient: Ingredient) => void }>(undefined as any)

const IngredientsTabs = () => {
    const { addUserIngredient, removeUserIngredient, userIngredients } = useUserIngredients()
    const [activeTab, setActiveTab] = useState("the-usuals")

    const handleClicked = (ingredient: Ingredient) => {
        if (!!userIngredients.find(item => item.name === ingredient.name)) {
            removeUserIngredient(ingredient)
        } else {
            addUserIngredient(ingredient)
        }
    }

    return (
        <HanldeIngredientClickContext.Provider value={{ handleClicked }}>
            <Tabs defaultValue={activeTab} className="w-[40rem] flex-1 flex flex-col">
                <TabsList className="flex">
                    <TabsTrigger onClick={() => setActiveTab('the-usuals')} className="flex-1" value="the-usuals">The Usuals</TabsTrigger>
                    <TabsTrigger onClick={() => setActiveTab('dairy')} className="flex-1" value="dairy">Dairy</TabsTrigger>
                    <TabsTrigger onClick={() => setActiveTab('vegetables')} className="flex-1" value="vegetables">Vegetables & Greens</TabsTrigger>
                    <TabsTrigger onClick={() => setActiveTab('spices')} className="flex-1" value="spices">Spices</TabsTrigger>
                </TabsList>
                {activeTab === 'the-usuals' &&
                    <TabsContent value="the-usuals" className="flex flex-col flex-1">
                        <IngredientsList
                            queryKey="common-ingredient-suggestions"
                            queryFn={getCommonIngredients}
                        />
                    </TabsContent>
                }
                {activeTab === 'dairy' &&
                    <TabsContent value="dairy" className="flex-1 flex flex-col">
                        <IngredientsList
                            queryKey="dairy-ingredient-suggestions"
                            queryFn={getDairyIngredients}
                        />
                    </TabsContent>
                }
                {activeTab === 'vegetables' &&
                    <TabsContent value="vegetables" className="flex-1 flex flex-col">
                        <IngredientsList
                            queryKey="vegetables-ingredient-suggestions"
                            queryFn={getVegetablesIngredients}
                        />
                    </TabsContent>
                }
                {activeTab === 'spices' &&
                    <TabsContent value="spices" className="flex-1 flex flex-col">
                        <IngredientsList
                            queryKey="spices-suggestions"
                            queryFn={getSpicesSuggestions}
                        />
                    </TabsContent>
                }
                {activeTab === 'vegetables' &&
                    <TabsContent value="vegetables" className="flex-1 flex flex-col">
                        <IngredientsList
                            queryKey="vegetables-ingredient-suggestions"
                            queryFn={getVegetablesIngredients}
                        />
                    </TabsContent>
                }
            </Tabs>
        </HanldeIngredientClickContext.Provider>
    )
}

export default IngredientsTabs

type UsualIngredientsContent = {
    queryKey: string,
    queryFn: () => Promise<any>
}

const IngredientsList = ({ queryKey, queryFn }: UsualIngredientsContent) => {
    const { data: ingredients, isLoading, error } = useQuery({
        queryKey: [`${queryKey}`],
        queryFn: queryFn,
    })

    if (error) {
        toast({
            variant: "destructive",
            title: "Oops! Something went wrong!",
            //@ts-expect-error
            description: error?.response?.data?.message || "An error occurred while fetching ingredients.",
        })
        return (<div>Error</div>) //TODO: add error image/ component
    }

    if (isLoading) {
        return (
            <div className="flex-1 flex justify-center items-center">
                <LoadingSpinner className="size-16" />
            </div>
        )
    }

    return (
        <div className="flex-[1_1_0] flex gap-3 flex-wrap overflow-y-auto">
            {ingredients?.map((ingredient: Ingredient) => ( //TODO: Fix any type
                <OptionCheckbox
                    key={ingredient.name}
                    ingredient={ingredient}
                />
            ))}
        </div>
    )
}