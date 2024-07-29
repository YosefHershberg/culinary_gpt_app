import { BrowserRouter as Router } from 'react-router-dom';
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { ThemeProvider } from "@/context/theme-provider"
import { AuthProvider } from "@/context/auth-provider"
import { CreateRecipeProvider } from "@/context/create-recipe-provider"
import { UserDataProvider } from "@/context/user-data-provider"
import ClerkProvider from "@/context/clerk-provider"

import LoadingPage from "@/pages/LoadingPage"
import ErrorPage from "@/pages/ErrorPage"

import { Toaster } from "@/components/ui/toaster"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
    },
  },
})

// NOTE: the order of the wrappers are precise!
// Router has to wrap ClerkProvider
// AuthProvider has to wrap any Component that trigger a fetch req that requires authentication (axoisCLient)
// Theme provider & AuthProvider has to wrap Suspense

const Providers = ({ children }: { children: React.ReactNode }) => {

  return (
    <Router>
      <ErrorBoundary FallbackComponent={ErrorPage}>
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
              <ClerkProvider>
                <AuthProvider>
                  <Suspense fallback={<LoadingPage />}>
                    <UserDataProvider>
                      <CreateRecipeProvider>
                        {children}
                        <Toaster />
                        <ReactQueryDevtools initialIsOpen={false} />
                      </CreateRecipeProvider>
                    </UserDataProvider>
                  </Suspense>
                </AuthProvider>
              </ClerkProvider>
            </ThemeProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </Router>
  )
}

export default Providers