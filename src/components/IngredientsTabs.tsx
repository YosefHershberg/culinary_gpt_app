import { createContext, useState } from "react";
import { useQuery } from '@tanstack/react-query';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LoadingSpinner from "@/components/ui/LaodingSpinner";
import { OptionCheckbox } from "@/components/ui/OptionCheckbox";
import { toast } from "@/components/ui/use-toast"
import { getIngredientSuggestions } from '@/lib/api';

import { useUserData } from "@/context/user-data-provider";
import { Ingredient } from "@/lib/types";

export const HanldeIngredientClickContext = createContext<{ handleClicked: (ingredient: Ingredient) => void }>(undefined as any)

enum ActiveTab {
    Common = 'common',
    Dairy = 'dairy',
    Vegetables = 'vegetables',
    Spices = 'spices',
    Carbs = 'carbs',
    Meat = 'meat',
}

const IngredientsTabs = () => {
    const { addUserIngredient, deleteUserIngredient, userIngredients } = useUserData()
    
    const [activeTab, setActiveTab] = useState<ActiveTab>(ActiveTab.Common)

    const handleClicked = (ingredient: Ingredient) => {
        if (!!userIngredients?.find(item => item.name === ingredient.name)) {
            deleteUserIngredient(ingredient)
        } else {
            addUserIngredient(ingredient)
        }
    }

    return (
        <HanldeIngredientClickContext.Provider value={{ handleClicked }}>
            <Tabs defaultValue={activeTab} className="rounded-xl max-w-[60rem] flex-1 flex flex-col">
                <TabsList>
                    <div className="w-[90vw] min-w-0 flex overflow-x-auto overflow-y-hidden">
                        <TabsTrigger onClick={() => setActiveTab(ActiveTab.Common)} className="flex-1" value={ActiveTab.Common}>The Usuals</TabsTrigger>
                        <TabsTrigger onClick={() => setActiveTab(ActiveTab.Dairy)} className="flex-1" value={ActiveTab.Dairy}>Dairy</TabsTrigger>
                        <TabsTrigger onClick={() => setActiveTab(ActiveTab.Vegetables)} className="flex-1" value={ActiveTab.Vegetables}>Vegetables & Greens</TabsTrigger>
                        <TabsTrigger onClick={() => setActiveTab(ActiveTab.Spices)} className="flex-1" value={ActiveTab.Spices}>Spices</TabsTrigger>
                        <TabsTrigger onClick={() => setActiveTab(ActiveTab.Carbs)} className="flex-1" value={ActiveTab.Carbs}>Carbs</TabsTrigger>
                        <TabsTrigger onClick={() => setActiveTab(ActiveTab.Meat)} className="flex-1" value={ActiveTab.Meat}>Meat</TabsTrigger>
                    </div>
                </TabsList>
                {activeTab === ActiveTab.Common &&
                    <TabsContent value={ActiveTab.Common} className="flex flex-col flex-1">
                        <IngredientsList
                            queryKey="common-ingredient-suggestions"
                            queryFn={() => getIngredientSuggestions(ActiveTab.Common)}
                        />
                    </TabsContent>
                }
                {activeTab === ActiveTab.Dairy &&
                    <TabsContent value={ActiveTab.Dairy} className="flex-1 flex flex-col">
                        <IngredientsList
                            queryKey="dairy-ingredient-suggestions"
                            queryFn={() => getIngredientSuggestions(ActiveTab.Dairy)}
                        />
                    </TabsContent>
                }
                {activeTab === ActiveTab.Vegetables &&
                    <TabsContent value={ActiveTab.Vegetables} className="flex-1 flex flex-col">
                        <IngredientsList
                            queryKey="vegetables-ingredient-suggestions"
                            queryFn={() => getIngredientSuggestions(ActiveTab.Vegetables)}
                        />
                    </TabsContent>
                }
                {activeTab === ActiveTab.Spices &&
                    <TabsContent value={ActiveTab.Spices} className="flex-1 flex flex-col">
                        <IngredientsList
                            queryKey="spices-suggestions"
                            queryFn={() => getIngredientSuggestions(ActiveTab.Spices)}
                        />
                    </TabsContent>
                }
                {activeTab === ActiveTab.Carbs &&
                    <TabsContent value={ActiveTab.Carbs} className="flex-1 flex flex-col">
                        <IngredientsList
                            queryKey="carbs-ingredient-suggestions"
                            queryFn={() => getIngredientSuggestions(ActiveTab.Carbs)}
                        />
                    </TabsContent>
                }
                {activeTab === ActiveTab.Meat &&
                    <TabsContent value={ActiveTab.Meat} className="flex-1 flex flex-col">
                        <IngredientsList
                            queryKey="meat-ingredient-suggestions"
                            queryFn={() => getIngredientSuggestions(ActiveTab.Meat)}
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
            {ingredients?.map((ingredient: Ingredient) => (
                <OptionCheckbox
                    key={ingredient.id}
                    ingredient={ingredient}
                />
            ))}
        </div>
    )
}