/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as SignupImport } from './routes/signup'
import { Route as SigninImport } from './routes/signin'
import { Route as AuthRouteImport } from './routes/_auth/route'
import { Route as IndexImport } from './routes/index'
import { Route as AuthRecipeImport } from './routes/_auth/recipe'
import { Route as AuthMyRecipesRouteImport } from './routes/_auth/my-recipes/route'
import { Route as AuthMyRecipesIndexImport } from './routes/_auth/my-recipes/index'
import { Route as AuthUserRecipeRecipeIdImport } from './routes/_auth/user-recipe/$recipeId'
import { Route as AuthMyIngredientsFoodImport } from './routes/_auth/my-ingredients/food'
import { Route as AuthMyIngredientsDrinksImport } from './routes/_auth/my-ingredients/drinks'

// Create Virtual Routes

const AuthCreateRecipeLazyImport = createFileRoute('/_auth/create-recipe')()
const AuthCreateCocktailLazyImport = createFileRoute('/_auth/create-cocktail')()
const AuthMyIngredientsRouteLazyImport = createFileRoute(
  '/_auth/my-ingredients',
)()

// Create/Update Routes

const SignupRoute = SignupImport.update({
  id: '/signup',
  path: '/signup',
  getParentRoute: () => rootRoute,
} as any)

const SigninRoute = SigninImport.update({
  id: '/signin',
  path: '/signin',
  getParentRoute: () => rootRoute,
} as any)

const AuthRouteRoute = AuthRouteImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AuthCreateRecipeLazyRoute = AuthCreateRecipeLazyImport.update({
  id: '/create-recipe',
  path: '/create-recipe',
  getParentRoute: () => AuthRouteRoute,
} as any).lazy(() =>
  import('./routes/_auth/create-recipe.lazy').then((d) => d.Route),
)

const AuthCreateCocktailLazyRoute = AuthCreateCocktailLazyImport.update({
  id: '/create-cocktail',
  path: '/create-cocktail',
  getParentRoute: () => AuthRouteRoute,
} as any).lazy(() =>
  import('./routes/_auth/create-cocktail.lazy').then((d) => d.Route),
)

const AuthMyIngredientsRouteLazyRoute = AuthMyIngredientsRouteLazyImport.update(
  {
    id: '/my-ingredients',
    path: '/my-ingredients',
    getParentRoute: () => AuthRouteRoute,
  } as any,
).lazy(() =>
  import('./routes/_auth/my-ingredients/route.lazy').then((d) => d.Route),
)

const AuthRecipeRoute = AuthRecipeImport.update({
  id: '/recipe',
  path: '/recipe',
  getParentRoute: () => AuthRouteRoute,
} as any)

const AuthMyRecipesRouteRoute = AuthMyRecipesRouteImport.update({
  id: '/my-recipes',
  path: '/my-recipes',
  getParentRoute: () => AuthRouteRoute,
} as any)

const AuthMyRecipesIndexRoute = AuthMyRecipesIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => AuthMyRecipesRouteRoute,
} as any)

const AuthUserRecipeRecipeIdRoute = AuthUserRecipeRecipeIdImport.update({
  id: '/user-recipe/$recipeId',
  path: '/user-recipe/$recipeId',
  getParentRoute: () => AuthRouteRoute,
} as any)

const AuthMyIngredientsFoodRoute = AuthMyIngredientsFoodImport.update({
  id: '/food',
  path: '/food',
  getParentRoute: () => AuthMyIngredientsRouteLazyRoute,
} as any)

const AuthMyIngredientsDrinksRoute = AuthMyIngredientsDrinksImport.update({
  id: '/drinks',
  path: '/drinks',
  getParentRoute: () => AuthMyIngredientsRouteLazyRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_auth': {
      id: '/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthRouteImport
      parentRoute: typeof rootRoute
    }
    '/signin': {
      id: '/signin'
      path: '/signin'
      fullPath: '/signin'
      preLoaderRoute: typeof SigninImport
      parentRoute: typeof rootRoute
    }
    '/signup': {
      id: '/signup'
      path: '/signup'
      fullPath: '/signup'
      preLoaderRoute: typeof SignupImport
      parentRoute: typeof rootRoute
    }
    '/_auth/my-recipes': {
      id: '/_auth/my-recipes'
      path: '/my-recipes'
      fullPath: '/my-recipes'
      preLoaderRoute: typeof AuthMyRecipesRouteImport
      parentRoute: typeof AuthRouteImport
    }
    '/_auth/recipe': {
      id: '/_auth/recipe'
      path: '/recipe'
      fullPath: '/recipe'
      preLoaderRoute: typeof AuthRecipeImport
      parentRoute: typeof AuthRouteImport
    }
    '/_auth/my-ingredients': {
      id: '/_auth/my-ingredients'
      path: '/my-ingredients'
      fullPath: '/my-ingredients'
      preLoaderRoute: typeof AuthMyIngredientsRouteLazyImport
      parentRoute: typeof AuthRouteImport
    }
    '/_auth/create-cocktail': {
      id: '/_auth/create-cocktail'
      path: '/create-cocktail'
      fullPath: '/create-cocktail'
      preLoaderRoute: typeof AuthCreateCocktailLazyImport
      parentRoute: typeof AuthRouteImport
    }
    '/_auth/create-recipe': {
      id: '/_auth/create-recipe'
      path: '/create-recipe'
      fullPath: '/create-recipe'
      preLoaderRoute: typeof AuthCreateRecipeLazyImport
      parentRoute: typeof AuthRouteImport
    }
    '/_auth/my-ingredients/drinks': {
      id: '/_auth/my-ingredients/drinks'
      path: '/drinks'
      fullPath: '/my-ingredients/drinks'
      preLoaderRoute: typeof AuthMyIngredientsDrinksImport
      parentRoute: typeof AuthMyIngredientsRouteLazyImport
    }
    '/_auth/my-ingredients/food': {
      id: '/_auth/my-ingredients/food'
      path: '/food'
      fullPath: '/my-ingredients/food'
      preLoaderRoute: typeof AuthMyIngredientsFoodImport
      parentRoute: typeof AuthMyIngredientsRouteLazyImport
    }
    '/_auth/user-recipe/$recipeId': {
      id: '/_auth/user-recipe/$recipeId'
      path: '/user-recipe/$recipeId'
      fullPath: '/user-recipe/$recipeId'
      preLoaderRoute: typeof AuthUserRecipeRecipeIdImport
      parentRoute: typeof AuthRouteImport
    }
    '/_auth/my-recipes/': {
      id: '/_auth/my-recipes/'
      path: '/'
      fullPath: '/my-recipes/'
      preLoaderRoute: typeof AuthMyRecipesIndexImport
      parentRoute: typeof AuthMyRecipesRouteImport
    }
  }
}

// Create and export the route tree

interface AuthMyRecipesRouteRouteChildren {
  AuthMyRecipesIndexRoute: typeof AuthMyRecipesIndexRoute
}

const AuthMyRecipesRouteRouteChildren: AuthMyRecipesRouteRouteChildren = {
  AuthMyRecipesIndexRoute: AuthMyRecipesIndexRoute,
}

const AuthMyRecipesRouteRouteWithChildren =
  AuthMyRecipesRouteRoute._addFileChildren(AuthMyRecipesRouteRouteChildren)

interface AuthMyIngredientsRouteLazyRouteChildren {
  AuthMyIngredientsDrinksRoute: typeof AuthMyIngredientsDrinksRoute
  AuthMyIngredientsFoodRoute: typeof AuthMyIngredientsFoodRoute
}

const AuthMyIngredientsRouteLazyRouteChildren: AuthMyIngredientsRouteLazyRouteChildren =
  {
    AuthMyIngredientsDrinksRoute: AuthMyIngredientsDrinksRoute,
    AuthMyIngredientsFoodRoute: AuthMyIngredientsFoodRoute,
  }

const AuthMyIngredientsRouteLazyRouteWithChildren =
  AuthMyIngredientsRouteLazyRoute._addFileChildren(
    AuthMyIngredientsRouteLazyRouteChildren,
  )

interface AuthRouteRouteChildren {
  AuthMyRecipesRouteRoute: typeof AuthMyRecipesRouteRouteWithChildren
  AuthRecipeRoute: typeof AuthRecipeRoute
  AuthMyIngredientsRouteLazyRoute: typeof AuthMyIngredientsRouteLazyRouteWithChildren
  AuthCreateCocktailLazyRoute: typeof AuthCreateCocktailLazyRoute
  AuthCreateRecipeLazyRoute: typeof AuthCreateRecipeLazyRoute
  AuthUserRecipeRecipeIdRoute: typeof AuthUserRecipeRecipeIdRoute
}

const AuthRouteRouteChildren: AuthRouteRouteChildren = {
  AuthMyRecipesRouteRoute: AuthMyRecipesRouteRouteWithChildren,
  AuthRecipeRoute: AuthRecipeRoute,
  AuthMyIngredientsRouteLazyRoute: AuthMyIngredientsRouteLazyRouteWithChildren,
  AuthCreateCocktailLazyRoute: AuthCreateCocktailLazyRoute,
  AuthCreateRecipeLazyRoute: AuthCreateRecipeLazyRoute,
  AuthUserRecipeRecipeIdRoute: AuthUserRecipeRecipeIdRoute,
}

const AuthRouteRouteWithChildren = AuthRouteRoute._addFileChildren(
  AuthRouteRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '': typeof AuthRouteRouteWithChildren
  '/signin': typeof SigninRoute
  '/signup': typeof SignupRoute
  '/my-recipes': typeof AuthMyRecipesRouteRouteWithChildren
  '/recipe': typeof AuthRecipeRoute
  '/my-ingredients': typeof AuthMyIngredientsRouteLazyRouteWithChildren
  '/create-cocktail': typeof AuthCreateCocktailLazyRoute
  '/create-recipe': typeof AuthCreateRecipeLazyRoute
  '/my-ingredients/drinks': typeof AuthMyIngredientsDrinksRoute
  '/my-ingredients/food': typeof AuthMyIngredientsFoodRoute
  '/user-recipe/$recipeId': typeof AuthUserRecipeRecipeIdRoute
  '/my-recipes/': typeof AuthMyRecipesIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof AuthRouteRouteWithChildren
  '/signin': typeof SigninRoute
  '/signup': typeof SignupRoute
  '/recipe': typeof AuthRecipeRoute
  '/my-ingredients': typeof AuthMyIngredientsRouteLazyRouteWithChildren
  '/create-cocktail': typeof AuthCreateCocktailLazyRoute
  '/create-recipe': typeof AuthCreateRecipeLazyRoute
  '/my-ingredients/drinks': typeof AuthMyIngredientsDrinksRoute
  '/my-ingredients/food': typeof AuthMyIngredientsFoodRoute
  '/user-recipe/$recipeId': typeof AuthUserRecipeRecipeIdRoute
  '/my-recipes': typeof AuthMyRecipesIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/_auth': typeof AuthRouteRouteWithChildren
  '/signin': typeof SigninRoute
  '/signup': typeof SignupRoute
  '/_auth/my-recipes': typeof AuthMyRecipesRouteRouteWithChildren
  '/_auth/recipe': typeof AuthRecipeRoute
  '/_auth/my-ingredients': typeof AuthMyIngredientsRouteLazyRouteWithChildren
  '/_auth/create-cocktail': typeof AuthCreateCocktailLazyRoute
  '/_auth/create-recipe': typeof AuthCreateRecipeLazyRoute
  '/_auth/my-ingredients/drinks': typeof AuthMyIngredientsDrinksRoute
  '/_auth/my-ingredients/food': typeof AuthMyIngredientsFoodRoute
  '/_auth/user-recipe/$recipeId': typeof AuthUserRecipeRecipeIdRoute
  '/_auth/my-recipes/': typeof AuthMyRecipesIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | ''
    | '/signin'
    | '/signup'
    | '/my-recipes'
    | '/recipe'
    | '/my-ingredients'
    | '/create-cocktail'
    | '/create-recipe'
    | '/my-ingredients/drinks'
    | '/my-ingredients/food'
    | '/user-recipe/$recipeId'
    | '/my-recipes/'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | ''
    | '/signin'
    | '/signup'
    | '/recipe'
    | '/my-ingredients'
    | '/create-cocktail'
    | '/create-recipe'
    | '/my-ingredients/drinks'
    | '/my-ingredients/food'
    | '/user-recipe/$recipeId'
    | '/my-recipes'
  id:
    | '__root__'
    | '/'
    | '/_auth'
    | '/signin'
    | '/signup'
    | '/_auth/my-recipes'
    | '/_auth/recipe'
    | '/_auth/my-ingredients'
    | '/_auth/create-cocktail'
    | '/_auth/create-recipe'
    | '/_auth/my-ingredients/drinks'
    | '/_auth/my-ingredients/food'
    | '/_auth/user-recipe/$recipeId'
    | '/_auth/my-recipes/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AuthRouteRoute: typeof AuthRouteRouteWithChildren
  SigninRoute: typeof SigninRoute
  SignupRoute: typeof SignupRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AuthRouteRoute: AuthRouteRouteWithChildren,
  SigninRoute: SigninRoute,
  SignupRoute: SignupRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_auth",
        "/signin",
        "/signup"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_auth": {
      "filePath": "_auth/route.tsx",
      "children": [
        "/_auth/my-recipes",
        "/_auth/recipe",
        "/_auth/my-ingredients",
        "/_auth/create-cocktail",
        "/_auth/create-recipe",
        "/_auth/user-recipe/$recipeId"
      ]
    },
    "/signin": {
      "filePath": "signin.tsx"
    },
    "/signup": {
      "filePath": "signup.tsx"
    },
    "/_auth/my-recipes": {
      "filePath": "_auth/my-recipes/route.tsx",
      "parent": "/_auth",
      "children": [
        "/_auth/my-recipes/"
      ]
    },
    "/_auth/recipe": {
      "filePath": "_auth/recipe.tsx",
      "parent": "/_auth"
    },
    "/_auth/my-ingredients": {
      "filePath": "_auth/my-ingredients/route.lazy.tsx",
      "parent": "/_auth",
      "children": [
        "/_auth/my-ingredients/drinks",
        "/_auth/my-ingredients/food"
      ]
    },
    "/_auth/create-cocktail": {
      "filePath": "_auth/create-cocktail.lazy.tsx",
      "parent": "/_auth"
    },
    "/_auth/create-recipe": {
      "filePath": "_auth/create-recipe.lazy.tsx",
      "parent": "/_auth"
    },
    "/_auth/my-ingredients/drinks": {
      "filePath": "_auth/my-ingredients/drinks.tsx",
      "parent": "/_auth/my-ingredients"
    },
    "/_auth/my-ingredients/food": {
      "filePath": "_auth/my-ingredients/food.tsx",
      "parent": "/_auth/my-ingredients"
    },
    "/_auth/user-recipe/$recipeId": {
      "filePath": "_auth/user-recipe/$recipeId.tsx",
      "parent": "/_auth"
    },
    "/_auth/my-recipes/": {
      "filePath": "_auth/my-recipes/index.tsx",
      "parent": "/_auth/my-recipes"
    }
  }
}
ROUTE_MANIFEST_END */
