import { useCallback, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getIngredientSuggestionsAPI } from '@/services/ingredient.service';
import { IngredientCategories } from "@/lib/enums";
import IngredientsList from "../create-components/IngredientList";
import { Beef, Carrot, Croissant, EggFried, LeafyGreen, Milk } from "lucide-react";

const tabConfig = [
    {
        value: IngredientCategories.Common,
        label: "The Usuals",
        icon: <EggFried className="size-4" />,
    },
    {
        value: IngredientCategories.Dairy,
        label: "Dairy",
        icon: <Milk className="size-4" />,
    },
    {
        value: IngredientCategories.Vegetables,
        label: "Vegetables & Greens",
        icon: <Carrot className="size-4" />,
    },
    {
        value: IngredientCategories.Spices,
        label: "Spices",
        icon: <LeafyGreen className="size-4" />,
    },
    {
        value: IngredientCategories.Carbs,
        label: "Carbs",
        icon: <Croissant className="size-4" />,
    },
    {
        value: IngredientCategories.Meat,
        label: "Meat",
        icon: <Beef className="size-4" />,
    },
];

const IngredientsTabs: React.FC = () => {
    const [activeTab, setActiveTab] = useState<IngredientCategories>(IngredientCategories.Common);
    
    const renderTabsContent = useCallback((category: IngredientCategories) => (
        <TabsContent value={category} className="flex-1 flex flex-col">
            <IngredientsList
                queryKey={`${category}-ingredient-suggestions`}
                queryFn={() => getIngredientSuggestionsAPI(category)}
            />
        </TabsContent>
    ), []);

    return (
        <Tabs defaultValue={IngredientCategories.Common} className="rounded-xl max-w-[60rem] w-full flex-1 flex flex-col">
            <TabsList>
                <div className="lg:w-full w-[90vw] min-w-0 flex overflow-x-auto overflow-y-hidden">
                    {tabConfig.map((tab) => (
                        <TabsTrigger
                            key={tab.value}
                            onClick={() => setActiveTab(tab.value)}
                            className="flex-1"
                            value={tab.value}
                        >
                            <span className="flex items-center gap-2">
                                {tab.label} {tab.icon}
                            </span>
                        </TabsTrigger>
                    ))}
                </div>
            </TabsList>
            {renderTabsContent(activeTab)}
        </Tabs>
    );
};

export default IngredientsTabs;