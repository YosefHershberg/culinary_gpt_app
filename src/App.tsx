import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { Toaster } from './components/ui/toaster'
import { useAuth } from './context/auth-context'
import { RouterProvider } from '@tanstack/react-router'
import { router } from './router'
import queryClient from './config/queryClient'
import { Providers } from './Providers'
import env from './utils/env'

function InnerApp() {
  const auth = useAuth()
  return <RouterProvider router={router} context={{ auth, queryClient }} />
}

const App: React.FC = () => (
  <Providers>
    <InnerApp />
    <Toaster />
    {env.NODE_ENV === 'development' &&
      <ReactQueryDevtools initialIsOpen={false} />}
  </Providers>
)


export default App