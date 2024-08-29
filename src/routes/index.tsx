import { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import NotFoundPage from '@/pages/NotFoundPage'
import CreateNewRecipePage from '@/pages/CreateNewRecipePage'

import ProtectedRoutes from '@/routes/ProtectedRoutes'
import WelcomePage from '@/pages/WelcomePage'
import { AppLayout } from '@/App'

const Signup = lazy(() => import('@/pages/Signup'))
const Signin = lazy(() => import('@/pages/Signin'))
const MyIngredients = lazy(() => import('@/pages/MyIngredients'))
const MyRecipes = lazy(() => import('@/pages/MyRecipes'))
const UserRecipe = lazy(() => import('@/components/UserRecipe'))
const CreatedRecipe = lazy(() => import('@/components/CreatedRecipe'))

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<AppLayout />}>
        <Route index element={<WelcomePage />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="create-new-recipe" element={<CreateNewRecipePage />} />
          <Route path='my-ingredients' element={<MyIngredients />} />
          <Route path='my-recipes' element={<MyRecipes />} />
          <Route path='recipe' element={<CreatedRecipe />} />
          <Route path='user-recipe/:id' element={<UserRecipe />} />
        </Route>
      </Route>
      <Route path='signup/*' element={<Signup />} />
      <Route path='signin/*' element={<Signin />} />

      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default Router