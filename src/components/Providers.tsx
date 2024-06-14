import { BrowserRouter as Router } from 'react-router-dom';
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"

import { ThemeProvider } from "@/context-providers/theme-provider"
import { AuthProvider } from "@/context-providers/auth-provider"
import { CookiesProvider } from 'react-cookie'
import { CreateRecipeProvider } from "@/context-providers/create-recipe-provider"
import { UserDataProvider } from "@/context-providers/user-data-provider"
import ClerkProvider from "@/context-providers/clerk-provider"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import LoadingPage from "@/pages/LoadingPage"
import ErrorPage from "@/pages/ErrorPage"

import { Toaster } from "@/components/ui/toaster"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    },
  },
})

// NOTE: the order of the wrappers are precise!
// Router has to wrap ClerkProvider
// AuthProvider has to wrap any Component that trigger a fetch req that requires authentication (axoisCLient)
// Theme provider has to wrap Suspense

const Providers = ({ children }: { children: React.ReactNode }) => {

  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <CookiesProvider>
            <ThemeProvider>
              <Suspense fallback={<LoadingPage />}>
                <ClerkProvider>
                  <AuthProvider>
                    <UserDataProvider>
                      <CreateRecipeProvider>
                        {children}
                        <Toaster />
                        <ReactQueryDevtools initialIsOpen={false} />
                      </CreateRecipeProvider>
                    </UserDataProvider>
                  </AuthProvider>
                </ClerkProvider>
              </Suspense>
            </ThemeProvider>
          </CookiesProvider>
        </Router>
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

export default Providers