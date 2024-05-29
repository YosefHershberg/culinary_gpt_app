import React from 'react'
import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input';

const IngredientSearchbar = () => {
    const placeholders = [
        "Whole Wheat Bread",
        "Tomato",
        "Canola oil",
        "Salt",
        "White wine",
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
    };
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("submitted");
    };
    return (
        <div className='max-w-[35rem] w-full mb-4'>
            <PlaceholdersAndVanishInput
                placeholders={placeholders}
                onChange={handleChange}
                onSubmit={onSubmit}
            />
        </div>
    )
}

export default IngredientSearchbar