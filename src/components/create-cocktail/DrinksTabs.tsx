import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getIngredientSuggestions } from '@/services/ingredient.service';

import { DrinksCategories } from "@/lib/enums";
import IngredientsList from "../IngredientList";

const TabsContentMap = {
    [DrinksCategories.Spirits]: (
        <TabsContent value={DrinksCategories.Spirits} className="flex-1 flex flex-col">
            <IngredientsList
                queryKey="spirits-ingredient-suggestions"
                queryFn={() => getIngredientSuggestions(DrinksCategories.Spirits)}
            />
        </TabsContent>
    ),
    [DrinksCategories.Liqueurs]: (
        <TabsContent value={DrinksCategories.Liqueurs} className="flex-1 flex flex-col">
            <IngredientsList
                queryKey="liqueurs-ingredient-suggestions"
                queryFn={() => getIngredientSuggestions(DrinksCategories.Liqueurs)}
            />
        </TabsContent>
    ),
    [DrinksCategories.Bitters]: (
        <TabsContent value={DrinksCategories.Bitters} className="flex flex-col flex-1">
            <IngredientsList
                queryKey="biters-drinks-suggestions"
                queryFn={() => getIngredientSuggestions(DrinksCategories.Bitters)}
            />
        </TabsContent>
    ),
    [DrinksCategories.MixersAndJuices]: (
        <TabsContent value={DrinksCategories.MixersAndJuices} className="flex-1 flex flex-col">
            <IngredientsList
                queryKey="mixers-drinks-suggestions"
                queryFn={() => getIngredientSuggestions(DrinksCategories.MixersAndJuices)}
            />
        </TabsContent>
    ),
    [DrinksCategories.SyrupsAndSweeteners]: (
        <TabsContent value={DrinksCategories.SyrupsAndSweeteners} className="flex-1 flex flex-col">
            <IngredientsList
                queryKey="sweeteners-ingredient-suggestions"
                queryFn={() => getIngredientSuggestions(DrinksCategories.SyrupsAndSweeteners)}
            />
        </TabsContent>
    ),
    [DrinksCategories.FruitsAndGarnishes]: (
        <TabsContent value={DrinksCategories.FruitsAndGarnishes} className="flex-1 flex flex-col">
            <IngredientsList
                queryKey="garnishes-ingredient-suggestions"
                queryFn={() => getIngredientSuggestions(DrinksCategories.FruitsAndGarnishes)}
            />
        </TabsContent>
    ),
    [DrinksCategories.HerbsAndSpices]: (
        <TabsContent value={DrinksCategories.HerbsAndSpices} className="flex-1 flex flex-col">
            <IngredientsList
                queryKey="herbs-spices-ingredient-suggestions"
                queryFn={() => getIngredientSuggestions(DrinksCategories.HerbsAndSpices)}
            />
        </TabsContent>
    )
}

const IngredientsTabs: React.FC = () => {
    const [activeTab, setActiveTab] = useState<DrinksCategories>(DrinksCategories.Spirits)

    return (
        <Tabs defaultValue={DrinksCategories.Spirits} className="rounded-xl max-w-[60rem] w-full flex-1 flex flex-col">
            <TabsList>
                <div className="lg:w-[calc(100vw-310px)] w-[90vw] min-w-0 flex overflow-x-auto overflow-y-hidden">
                    {/* NOTICE: ^^^^ Change When width/padding/margin blocks surrounding this element changes*/}

                    <TabsTrigger
                        onClick={() => setActiveTab(DrinksCategories.Spirits)}
                        className="flex-1"
                        value={DrinksCategories.Spirits}
                    >
                        {`Spirits (Base Alcohol)`}
                    </TabsTrigger>
                    <TabsTrigger
                        onClick={() => setActiveTab(DrinksCategories.Liqueurs)}
                        className="flex-1"
                        value={DrinksCategories.Liqueurs}
                    >
                        Liqueurs
                    </TabsTrigger>
                    <TabsTrigger
                        onClick={() => setActiveTab(DrinksCategories.Bitters)}
                        className="flex-1"
                        value={DrinksCategories.Bitters}
                    >
                        Bitters
                    </TabsTrigger>
                    <TabsTrigger
                        onClick={() => setActiveTab(DrinksCategories.MixersAndJuices)}
                        className="flex-1"
                        value={DrinksCategories.MixersAndJuices}
                    >
                        Mixers & Juices
                    </TabsTrigger>
                    <TabsTrigger
                        onClick={() => setActiveTab(DrinksCategories.SyrupsAndSweeteners)}
                        className="flex-1"
                        value={DrinksCategories.SyrupsAndSweeteners}
                    >
                        Syrups & Sweeteners
                    </TabsTrigger>
                    <TabsTrigger
                        onClick={() => setActiveTab(DrinksCategories.FruitsAndGarnishes)}
                        className="flex-1"
                        value={DrinksCategories.FruitsAndGarnishes}
                    >
                        Fruits & Garnishes
                    </TabsTrigger>
                    <TabsTrigger
                        onClick={() => setActiveTab(DrinksCategories.HerbsAndSpices)}
                        className="flex-1"
                        value={DrinksCategories.HerbsAndSpices}
                    >
                        Herbs & Spices
                    </TabsTrigger>
                </div>
            </TabsList>
            {TabsContentMap[activeTab]}
        </Tabs>
    )
}

export default IngredientsTabs
