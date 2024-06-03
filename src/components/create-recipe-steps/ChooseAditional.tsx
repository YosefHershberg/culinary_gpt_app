import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Separator } from '@/components/ui/separator';
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { useEffect, useState } from "react";

const kitchenUtils = [
    { name: "Stove Top", value: false },
    { name: "Oven", value: false },
    { name: "Microwave", value: false },
    { name: "Air Fryer", value: false },
    { name: "Blender", value: false },
    { name: "Food Processor", value: false },
    { name: "Slow Cooker", value: false },
    { name: "BBQ", value: false },
    { name: "Grill", value: false }
]

const ChooseAditional = () => {
    const [mealSelected, setMealSelected] = useState<string>('lunch')
    const [kitchenUtilsSelected, setKitchenUtilsSelected] = useState(kitchenUtils)

    const handleMealSelected = (value: string) => {
        setMealSelected(value)
    }

    const handleKitchenUtilsSelected = (key: string) => {
        const newKitchenUtils = kitchenUtilsSelected.map(kitchenUtil => {
            if (kitchenUtil.name === key) {
                return {
                    ...kitchenUtil,
                    value: !kitchenUtil.value
                }
            }
            return kitchenUtil
        })

        setKitchenUtilsSelected(newKitchenUtils)
    }

    return (
        <div className='flex-1 flex flex-col items-center py-10'>
            <div className='max-w-[50rem] w-full'>
                <div className='flex md:flex-row flex-col justify-between items-center md:items start'>
                    <p className='font-bold text-lg md:text-none mb-6 md:mb-0'>What meal you want to cook?</p>
                    <Select onValueChange={handleMealSelected}>
                        <SelectTrigger className="max-w-[20rem] dark:bg-zinc-700">
                            <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent className='dark:bg-zinc-700'>
                            <SelectItem value="breakfast">Breakfast</SelectItem>
                            <SelectItem value="lunch">lunch</SelectItem>
                            <SelectItem value="dinner">Dinner</SelectItem>
                            <SelectItem value="snack">Snack</SelectItem>
                            <SelectItem value="dessert">Dessert</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <Separator className='my-6' />

                <div className='flex md:flex-row flex-col justify-between md:items-start items-center'>
                    <p className='font-bold text-lg md:text-none mb-6 md:mb-0'>Select the kitchen utensils you have.</p>
                    <div className="grid grid-cols-2 gap-3 sm:gap-x-10">
                        {kitchenUtilsSelected.map(kitchenUtil => (
                            <div key={kitchenUtil.name} className="flex items-center gap-3 start">
                                <Switch
                                    id={kitchenUtil.name}
                                    checked={kitchenUtil.value}
                                    onCheckedChange={() => handleKitchenUtilsSelected(kitchenUtil.name)}
                                />
                                <Label htmlFor={kitchenUtil.name}>{kitchenUtil.name}</Label>
                            </div>
                        ))}
                    </div>
                </div>

                <Separator className='my-6' />

                <div className='flex md:flex-row flex-col justify-between items-center md:items start'>
                    <p className='font-bold text-lg md:text-none mb-6 md:mb-0'>How much time do you have?</p>
                    <div className="w-[25rem] max-w-[80vw]">
                        <Slider defaultValue={[50]} max={120} step={10} onValueChange={(e) => console.log(e[0])}/>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ChooseAditional