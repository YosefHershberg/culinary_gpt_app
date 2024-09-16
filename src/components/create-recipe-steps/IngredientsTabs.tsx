import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getIngredientSuggestions } from '@/services/ingredient.service';

import { IngredientCategories } from "@/lib/enums";
import IngredientsList from "../IngredientList";

const TabsContentMap = {
    [IngredientCategories.Common]: (
        <TabsContent value={IngredientCategories.Common} className="flex flex-col flex-1">
            <IngredientsList
                queryKey="common-ingredient-suggestions"
                queryFn={() => getIngredientSuggestions(IngredientCategories.Common)}
            />
        </TabsContent>
    ),
    [IngredientCategories.Dairy]: (
        <TabsContent value={IngredientCategories.Dairy} className="flex-1 flex flex-col">
            <IngredientsList
                queryKey="dairy-ingredient-suggestions"
                queryFn={() => getIngredientSuggestions(IngredientCategories.Dairy)}
            />
        </TabsContent>
    ),
    [IngredientCategories.Vegetables]: (
        <TabsContent value={IngredientCategories.Vegetables} className="flex-1 flex flex-col">
            <IngredientsList
                queryKey="vegetables-ingredient-suggestions"
                queryFn={() => getIngredientSuggestions(IngredientCategories.Vegetables)}
            />
        </TabsContent>
    ),
    [IngredientCategories.Spices]: (
        <TabsContent value={IngredientCategories.Spices} className="flex-1 flex flex-col">
            <IngredientsList
                queryKey="spices-suggestions"
                queryFn={() => getIngredientSuggestions(IngredientCategories.Spices)}
            />
        </TabsContent>
    ),
    [IngredientCategories.Carbs]: (
        <TabsContent value={IngredientCategories.Carbs} className="flex-1 flex flex-col">
            <IngredientsList
                queryKey="carbs-ingredient-suggestions"
                queryFn={() => getIngredientSuggestions(IngredientCategories.Carbs)}
            />
        </TabsContent>
    ),
    [IngredientCategories.Meat]: (
        <TabsContent value={IngredientCategories.Meat} className="flex-1 flex flex-col">
            <IngredientsList
                queryKey="meat-ingredient-suggestions"
                queryFn={() => getIngredientSuggestions(IngredientCategories.Meat)}
            />
        </TabsContent>
    )
}

const IngredientsTabs: React.FC = () => {
    const [activeTab, setActiveTab] = useState<IngredientCategories>(IngredientCategories.Common)

    return (
        <Tabs defaultValue={IngredientCategories.Common} className="rounded-xl max-w-[60rem] w-full flex-1 flex flex-col">
            <TabsList>
                <div className="lg:w-full w-[90vw] min-w-0 flex overflow-x-auto overflow-y-hidden">
                    <TabsTrigger
                        onClick={() => setActiveTab(IngredientCategories.Common)}
                        className="flex-1"
                        value={IngredientCategories.Common}
                    >
                        The Usuals
                    </TabsTrigger>
                    <TabsTrigger
                        onClick={() => setActiveTab(IngredientCategories.Dairy)}
                        className="flex-1"
                        value={IngredientCategories.Dairy}
                    >
                        Dairy
                    </TabsTrigger>
                    <TabsTrigger
                        onClick={() => setActiveTab(IngredientCategories.Vegetables)}
                        className="flex-1"
                        value={IngredientCategories.Vegetables}
                    >
                        Vegetables & Greens
                    </TabsTrigger>
                    <TabsTrigger
                        onClick={() => setActiveTab(IngredientCategories.Spices)}
                        className="flex-1"
                        value={IngredientCategories.Spices}
                    >
                        Spices
                    </TabsTrigger>
                    <TabsTrigger
                        onClick={() => setActiveTab(IngredientCategories.Carbs)}
                        className="flex-1"
                        value={IngredientCategories.Carbs}
                    >
                        Carbs
                    </TabsTrigger>
                    <TabsTrigger
                        onClick={() => setActiveTab(IngredientCategories.Meat)}
                        className="flex-1"
                        value={IngredientCategories.Meat}
                    >
                        Meat
                    </TabsTrigger>
                </div>
            </TabsList>
            {TabsContentMap[activeTab]}
        </Tabs>
    )
}

export default IngredientsTabs
