import ChooseIngredients from "@/components/create-recipe-steps/ChooseIngredients"

const MyIngredients: React.FC = () => {
  return (
    <main className="flex-1 flex flex-col w-screen p-5">
      <ChooseIngredients />
    </main>
  )
}

export default MyIngredients