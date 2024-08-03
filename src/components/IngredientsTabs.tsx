import { createContext, useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getIngredientSuggestions } from '@/services/ingredient.service';

import { useUserData } from "@/context/user-data-provider";
import { Ingredient } from "@/lib/types";
import { ActiveTab } from "@/lib/enums";
import IngredientsList from "./IngredientList";

const TabsContentMap = {
    [ActiveTab.Common]: (
        <TabsContent value={ActiveTab.Common} className="flex flex-col flex-1">
            <IngredientsList
                queryKey="common-ingredient-suggestions"
                queryFn={() => getIngredientSuggestions(ActiveTab.Common)}
            />
        </TabsContent>
    ),
    [ActiveTab.Dairy]: (
        <TabsContent value={ActiveTab.Dairy} className="flex-1 flex flex-col">
            <IngredientsList
                queryKey="dairy-ingredient-suggestions"
                queryFn={() => getIngredientSuggestions(ActiveTab.Dairy)}
            />
        </TabsContent>
    ),
    [ActiveTab.Vegetables]: (
        <TabsContent value={ActiveTab.Vegetables} className="flex-1 flex flex-col">
            <IngredientsList
                queryKey="vegetables-ingredient-suggestions"
                queryFn={() => getIngredientSuggestions(ActiveTab.Vegetables)}
            />
        </TabsContent>
    ),
    [ActiveTab.Spices]: (
        <TabsContent value={ActiveTab.Spices} className="flex-1 flex flex-col">
            <IngredientsList
                queryKey="spices-suggestions"
                queryFn={() => getIngredientSuggestions(ActiveTab.Spices)}
            />
        </TabsContent>
    ),
    [ActiveTab.Carbs]: (
        <TabsContent value={ActiveTab.Carbs} className="flex-1 flex flex-col">
            <IngredientsList
                queryKey="carbs-ingredient-suggestions"
                queryFn={() => getIngredientSuggestions(ActiveTab.Carbs)}
            />
        </TabsContent>
    ),
    [ActiveTab.Meat]: (
        <TabsContent value={ActiveTab.Meat} className="flex-1 flex flex-col">
            <IngredientsList
                queryKey="meat-ingredient-suggestions"
                queryFn={() => getIngredientSuggestions(ActiveTab.Meat)}
            />
        </TabsContent>
    )
}

export const HandleIngredientClickContext = createContext<{ handleClicked: (ingredient: Ingredient) => void }>({ handleClicked: () => { } })

const IngredientsTabs: React.FC = () => {
    const { addUserIngredient, deleteUserIngredient, userIngredients } = useUserData()

    const [activeTab, setActiveTab] = useState<ActiveTab>(ActiveTab.Common)

    const handleClicked = (ingredient: Ingredient) => {
        if (userIngredients?.some(item => item.id === ingredient.id)) {
            deleteUserIngredient(ingredient)
        } else {
            addUserIngredient(ingredient)
        }
    }

    return (
        <HandleIngredientClickContext.Provider value={{ handleClicked }}>
            <Tabs defaultValue={activeTab} className="rounded-xl max-w-[60rem] flex-1 flex flex-col">
                <TabsList>
                    <div className="w-[90vw] min-w-0 flex overflow-x-auto overflow-y-hidden">
                        <TabsTrigger
                            onClick={() => setActiveTab(ActiveTab.Common)}
                            className="flex-1"
                            value={ActiveTab.Common}
                        >
                            The Usuals
                        </TabsTrigger>
                        <TabsTrigger
                            onClick={() => setActiveTab(ActiveTab.Dairy)}
                            className="flex-1"
                            value={ActiveTab.Dairy}
                        >
                            Dairy
                        </TabsTrigger>
                        <TabsTrigger
                            onClick={() => setActiveTab(ActiveTab.Vegetables)}
                            className="flex-1"
                            value={ActiveTab.Vegetables}
                        >
                            Vegetables & Greens
                        </TabsTrigger>
                        <TabsTrigger
                            onClick={() => setActiveTab(ActiveTab.Spices)}
                            className="flex-1"
                            value={ActiveTab.Spices}
                        >
                            Spices
                        </TabsTrigger>
                        <TabsTrigger
                            onClick={() => setActiveTab(ActiveTab.Carbs)}
                            className="flex-1"
                            value={ActiveTab.Carbs}
                        >
                            Carbs
                        </TabsTrigger>
                        <TabsTrigger
                            onClick={() => setActiveTab(ActiveTab.Meat)}
                            className="flex-1"
                            value={ActiveTab.Meat}
                        >
                            Meat
                        </TabsTrigger>
                    </div>
                </TabsList>
                {TabsContentMap[activeTab]}
            </Tabs>

        </HandleIngredientClickContext.Provider>
    )
}

export default IngredientsTabs
