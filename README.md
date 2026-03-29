# CulinaryGPT - Client

## Description

React SPA for AI-powered recipe and cocktail generation. Users manage their ingredient pantry and kitchen equipment, then generate personalized recipes with real-time streaming and AI-generated images.

## Tech Stack

- **Framework:** React 19 + TypeScript 5.2 + Vite 5.4
- **Routing:** TanStack Router (file-based, auto code-split)
- **Server State:** TanStack React Query v5
- **Styling:** Tailwind CSS + shadcn/ui (Radix primitives)
- **Auth:** Supabase Auth (session-based)
- **HTTP:** Axios (interceptor-based Bearer token injection)
- **Forms:** React Hook Form + Zod
- **Streaming:** `@microsoft/fetch-event-source` (SSE)
- **Animations:** Framer Motion + Lottie
- **PDF Export:** html2pdf.js
- **Package Manager:** pnpm (enforced)

## Get Started

```bash
pnpm install
cp .env.example .env   # fill in your values
pnpm run dev           # Vite dev server (http://localhost:5173)
```

## Commands

```bash
pnpm run dev           # Vite dev server
pnpm run build         # tsc + vite build
pnpm run lint          # ESLint (zero warnings enforced)
pnpm run test          # Vitest
pnpm run test:coverage # coverage report
pnpm run preview       # preview production build
```

## Environment Variables

See `.env.example`.

| Variable | Purpose |
|---|---|
| `VITE_API_URL` | Backend API base URL |
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon key (safe to expose) |

## Project Structure

```
src/
├── routes/                  # File-based routing (TanStack Router)
│   ├── index.tsx            # Landing page (/)
│   ├── signin.$.tsx         # Sign in
│   └── _auth/               # Protected routes (require Supabase session)
│       ├── route.tsx        # Auth guard (beforeLoad)
│       ├── create-recipe/   # 3-step recipe wizard
│       ├── create-cocktail/ # 2-step cocktail wizard
│       ├── my-recipes/      # Browse & manage saved recipes
│       ├── my-ingredients/  # Ingredient pantry (food + drinks tabs)
│       ├── recipe.tsx       # View newly generated recipe
│       └── user-recipe/     # View saved recipe by ID
├── components/
│   ├── ui/                  # shadcn/Radix primitives
│   ├── nav/                 # Navbar
│   ├── create-recipe-steps/ # Step 1/2/3 components
│   ├── create-cocktail/     # Cocktail creation components
│   ├── create-components/   # Shared ingredient pickers
│   ├── my-recipes/          # Recipe cards & list
│   └── modals/              # Dialog components
├── context/                 # Auth, CreateRecipe, CreateCocktail, UserData providers
├── hooks/                   # useSSE, useOptimisticMutation, useHttpClient, useDebounce, etc.
├── services/                # API service functions (recipe, ingredient, kitchenUtils, user)
├── config/                  # Axios client, Supabase client, React Query client
├── lib/                     # Types, enums, query keys
└── utils/
    └── env.ts               # Zod env validation
```
