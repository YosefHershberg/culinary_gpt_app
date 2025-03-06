import ChooseIngredients from '@/components/create-recipe-steps/ChooseIngredients'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/my-ingredients/food')({
  component: ChooseIngredients,
})
