import { Routes, Route, Outlet } from 'react-router-dom'
import { lazy } from 'react'
import NotFoundPage from '@/pages/NotFoundPage'
import CreateNewRecipePage from '@/pages/CreateNewRecipePage'

const WelcomePage = lazy(() => import('@/pages/WelcomePage'))
const Signup = lazy(() => import('@/pages/Signup'))
const Signin = lazy(() => import('@/pages/Signin'))
const MyIngredients = lazy(() => import('@/pages/MyIngredients'))
const MyRecipes = lazy(() => import('@/pages/MyRecipes'))
const RecipePage = lazy(() => import('@/pages/RecipePage'))

import Navbar from '@/components/nav/Navbar'
import ProtectedRoutes from '@/components/nav/ProtectedRoutes'

const App = () => {

  return (
    <Routes>
      <Route path='/' element={<AppLayout />}>
        <Route index element={<WelcomePage />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="create-new-recipe" element={<CreateNewRecipePage />} />
          <Route path='my-ingredients' element={<MyIngredients />}/>
          <Route path='my-recipes' element={<MyRecipes />} />
          <Route path='recipe/*' element={<RecipePage />} />
        </Route>
      </Route>
      <Route path='signup/*' element={<Signup />} />
      <Route path='signin/*' element={<Signin />} />
      
      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App

const AppLayout = () => {

  return (
    <main className='overflow-y-auto overflow-x-hidden h-screen w-screen flex flex-col'>
      <Navbar />
      <Outlet />
    </main>
  )
}