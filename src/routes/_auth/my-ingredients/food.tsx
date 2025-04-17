import { createFileRoute } from '@tanstack/react-router'
import ChooseIngredients from '@/components/create-recipe-steps/ChooseIngredients'

export const Route = createFileRoute('/_auth/my-ingredients/food')({
  component: ChooseIngredients,
})
