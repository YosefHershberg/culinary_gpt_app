import { Outlet } from 'react-router-dom'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import Navbar from './components/nav/Navbar'
import { Toaster } from './components/ui/toaster'
import Router from './routes'

const App: React.FC = () => {

  return (
    <>
      <Router />
      <Toaster />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  )
}

export default App

export const AppLayout: React.FC = () => {

  return (
    <main className='overflow-y-auto overflow-x-hidden h-screen w-screen flex flex-col'>
      <Navbar />
      <Outlet />
    </main>
  )
}