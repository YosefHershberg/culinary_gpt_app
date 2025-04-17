import { createFileRoute } from '@tanstack/react-router'
import ChooseDrinks from '@/components/create-cocktail/ChooseDrinks'

export const Route = createFileRoute('/_auth/my-ingredients/drinks')({
  component: ChooseDrinks,
})
