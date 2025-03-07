import ChooseDrinks from '@/components/create-cocktail/ChooseDrinks'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/my-ingredients/drinks')({
  component: ChooseDrinks,
})
