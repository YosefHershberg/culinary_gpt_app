import { BrowserRouter as Router } from 'react-router-dom';
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { QueryClientProvider } from "@tanstack/react-query"
import queryClient from '@/config/queryClient';

import { ThemeProvider } from "@/context/theme-context"
import { AuthProvider } from "@/context/auth-context"
import { CreateRecipeProvider } from "@/context/create-recipe-context"
import { CreateCocktailProvider } from './context/create-cocktail-context';
import { UserDataProvider } from "@/context/user-data-context"
import ClerkProvider from "@/context/clerk-context"

import LoadingPage from "@/pages/LoadingPage"
import ErrorPage from "@/pages/ErrorPage"

// NOTE: the order of the wrappers are precise!
// Router has to wrap ClerkProvider
// AuthProvider has to wrap any Component that trigger a fetch req that requires authentication (axiosClient)
// Theme provider & AuthProvider has to wrap Suspense

export const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  return (
    <Router>
      <ErrorBoundary FallbackComponent={ErrorPage}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <ClerkProvider>
              <AuthProvider>
                <Suspense fallback={<LoadingPage />}>
                  <UserDataProvider>
                    {children}
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

export const FeaturesProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <CreateRecipeProvider>
    <CreateCocktailProvider>
      {children}
    </CreateCocktailProvider>
  </CreateRecipeProvider>
)