import { HoverEffect } from "./ui/card-hover-effect"

const About: React.FC = () => {

    return (
        <div id="about" className="p-10 bg-blue-100 dark:bg-zinc-700 flex justify-center">
            <div className="flex flex-col items-center">
                <p className="text-orange text-xl">FEATURES</p>
                <h1 className="text-4xl text-center font-bold mt-10">Discover the Features</h1>
                <h2 className="text-2xl mt-10 text-center">Explore how our AI-powered platform can revolutionize your cooking experience</h2>

                <HoverEffect items={cardDetails} />
            </div>
        </div>
    )
}

export default About

export const cardDetails = [
    {
        title: "AI-Powered Recipe Suggestions",
        description:
            "Get personalized recipe ideas based on the ingredients you have at home.",
    },
    {
        title: "Ingredient Recognition",
        description:
            "Easily input your ingredients using text or image recognition technology",
    },
    {
        title: "Step-by-Step Instructions",
        description:
            "Follow detailed cooking instructions for each recipe to create delicious meals",
    },
    {
        title: "Save and Organize Recipes",
        description:
            "Save your favorite recipes and create shopping lists for future meals",
    },
];