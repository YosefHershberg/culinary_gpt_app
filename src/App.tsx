import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from '@tanstack/react-router'

import { Toaster } from '@/components/ui/toaster'
import { useAuth } from '@/context/auth-context'
import { router } from '@/router'
import queryClient from '@/config/queryClient'
import { Providers } from '@/Providers'

const InnerApp: React.FC = () => {
  const auth = useAuth()
  return (
    <RouterProvider
      router={router}
      context={{
        auth,
        queryClient,
      }}
    />
  )
}

const App: React.FC = () => (
  <Providers>
    <InnerApp />
    <Toaster />
    <ReactQueryDevtools initialIsOpen={false} />
  </Providers>
)

export default App