import { Suspense, useState } from "react";
import { useLocation } from "@tanstack/react-router";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import IngredientsList from "@/components/create-components/IngredientList";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { getIngredientSuggestionsAPI } from '@/services/ingredient.service';

import { DrinksCategories } from "@/lib/enums";
import { QueryKeys } from "@/lib/queryKeys";

const IngredientsTabs: React.FC = () => {
    const [activeTab, setActiveTab] = useState<DrinksCategories>(DrinksCategories.Spirits);
    const { pathname } = useLocation();

    const renderTabsContent = (category: DrinksCategories) => {
        const activeTabConfig = tabConfig[category];
        return (
            <TabsContent value={category} className="flex-1 flex flex-col">
                <Suspense fallback={(
                    <div className="flex-1 flex justify-center items-center">
                        <LoadingSpinner className="size-16" />
                    </div>
                )}>
                    <IngredientsList
                        queryKey={activeTabConfig.queryKey}
                        queryFn={activeTabConfig.queryFn}
                    />
                </Suspense>
            </TabsContent>
        );
    };

    return (
        <Tabs
            defaultValue={DrinksCategories.Spirits}
            className="rounded-xl max-w-[60rem] w-full flex-1 flex flex-col"
        >
            <TabsList>
                <div className={`${pathname.startsWith('/my-ingredients') && 'lg:w-[calc(100vw-310px)]'} w-[90vw] min-w-0 flex overflow-x-auto overflow-y-hidden`}>
                    {/* NOTICE: ^^^^ Change When width/padding/margin blocks surrounding this element changes*/}

                    {Object.entries(tabConfig).map(([key, tab]) => (
                        <TabsTrigger
                            key={key}
                            onClick={() => setActiveTab(key as DrinksCategories)}
                            className="flex-1"
                            value={key}
                        >
                            {tab.label}
                        </TabsTrigger>
                    ))}
                </div>
            </TabsList>
            {renderTabsContent(activeTab)}
        </Tabs>
    )
}

export default IngredientsTabs
