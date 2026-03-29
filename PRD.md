# CulinaryGPT - Product Requirements Document (PRD)

## 1. Product Overview

**CulinaryGPT** is an AI-powered recipe generation web application that creates personalized recipes and cocktails based on the ingredients users have at home. Users manage their ingredient inventory, configure kitchen utilities, and receive AI-generated recipes complete with images — all delivered via real-time streaming.

**Tagline:** "Cook Smarter, Eat Better: Your AI Recipe Companion"

---

## 2. Target Users

- Home cooks looking to reduce food waste by using ingredients they already have
- Users who struggle with meal planning and want AI-powered suggestions
- Cocktail enthusiasts wanting creative drink recipes from their bar inventory
- Health-conscious users with dietary restrictions or allergies who need tailored recipes

---

## 3. Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + TypeScript 5.2 |
| Build Tool | Vite 5.4 |
| Routing | TanStack Router (file-based, code-split) |
| Server State | TanStack React Query v5 |
| Styling | Tailwind CSS + shadcn/ui (Radix primitives) |
| Auth | Supabase Auth (session-based) |
| HTTP | Axios (interceptor-based Bearer token injection) |
| Forms | React Hook Form + Zod |
| Stepper UI | MUI Joy (Stepper, Step, StepIndicator) |
| Animations | Framer Motion + Lottie |
| SSE Streaming | @microsoft/fetch-event-source |
| PDF Export | html2pdf.js |
| Package Manager | pnpm (enforced) |

---

## 4. Architecture

### 4.1 Application Structure

```
src/
  routes/           # File-based routing (TanStack Router)
    _auth/          # Protected routes (require Supabase session)
  components/
    ui/             # Reusable shadcn/Radix primitives
    nav/            # Navigation components
    create-recipe-steps/  # Multi-step recipe creation
    create-cocktail/      # Multi-step cocktail creation
    create-components/    # Shared ingredient selection UI
    my-recipes/           # Recipe listing & management
    modals/               # Dialog components
  hooks/
    componentHooks/ # Feature-specific hooks
  context/          # React context providers
  services/         # API service layer
  config/           # Axios client, Supabase client, React Query client
  lib/              # Types, enums, query keys
  utils/            # Environment validation
```

### 4.2 Provider Hierarchy

```
QueryClientProvider
  ThemeProvider
    AuthProvider              # Supabase session + Axios interceptors
      TooltipProvider
        [Router]
          (Inside protected routes:)
          UserDataProvider    # Ingredients + Kitchen Utils (suspense queries)
            CreateRecipeProvider    # Recipe form + SSE stream
              CreateCocktailProvider # Cocktail prompt + SSE stream
```

### 4.3 Key Architectural Patterns

- **Optimistic Mutations**: Cancel pending queries → update cache → mutate → rollback on error → invalidate on settle. Used for ingredient CRUD, kitchen utils toggle, recipe delete.
- **SSE Streaming Chain**: `useSSE` (raw stream) → `useCreateItemStream` (tracks `recipe` + `image` events with separate loading states) → context provider (validation + submission + navigation).
- **Infinite Scroll**: `useInfiniteQuery` + Intersection Observer with sentinel ref. 4 recipes per page.
- **Route Preloading**: TanStack Router `intent` strategy. Loaders prefetch ingredient suggestions and recipe pages.
- **Component Reuse**: `ChooseIngredients` and `ChooseDrinks` are shared between creation flows and the My Ingredients page.

---

## 5. Features

### 5.1 Authentication

| Aspect | Detail |
|--------|--------|
| Provider | Supabase Auth |
| Methods | Email/password, social OAuth (configured in Supabase dashboard) |
| Route Protection | `beforeLoad` guard in `_auth/route.tsx` checks `context.auth.user` |
| Redirect Logic | Unauthenticated users redirected to `/signin` |
| Token Injection | Axios interceptor adds `Authorization: Bearer {session.access_token}` to all API calls |
| Rate Limiting | Axios response interceptor catches 429 → shows toast "Too many requests" |

**Routes:**
- `GET /signin/$` — Sign-in page (redirects home if already signed in)
- Both accept `?redirect=` search param to return user to original destination

### 5.2 Landing Page (`/`)

Public page with:
- **Hero section**: Animated slide-in (Framer Motion spring) with headline, tagline, and kitchen tools illustration
- **CTA**: "Get Started" button → `/create-recipe`
- **Learn More**: Opens `MoreInfoModal` — dialog describing CulinaryGPT
- **About section**: 4 feature cards with hover effect (AI Recipes, Ingredient Recognition, Step-by-Step Instructions, Save & Organize)
- **Footer**: Logo, tagline, copyright

### 5.3 Ingredient Management (`/my-ingredients`)

Users maintain a personal inventory of food and drink ingredients used for recipe/cocktail generation.

**Layout:**
- Desktop: Sidebar with "Ingredients" and "Drinks" tabs + content area
- Mobile: Floating bottom-left dropdown for tab switching
- Auto-redirects to `/my-ingredients/food` on initial load

#### 5.3.1 Food Ingredients Tab (`/my-ingredients/food`)

**Adding ingredients via:**

1. **Search**: Animated search bar cycling through placeholder text. Calls `GET /ingredients/search?query=&type=food`. Shows dropdown results. Prevents duplicates with toast warning.

2. **Category Suggestions**: Tabbed interface (Common, Dairy, Vegetables, Spices, Carbs, Meat). Each tab lazy-loads from `GET /ingredients/suggestions/{category}`. Checkbox UI to toggle ingredients; sortable by popularity/alphabetical.

3. **Image Detection**: Camera icon opens `ImageDetectorModal` with 3 states: upload → loading → detected ingredients list (checkboxes + bulk select). Converts image to base64 → `POST /ingredients/image-detect`.

4. **Options Menu**: Hamburger icon dropdown with: "Clear all ingredients" (confirmation modal), "Add all common ingredients", "Sort by.." submenu.

5. **Add Common Ingredients Modal**: Auto-opens when user has fewer than 5 ingredients (onboarding prompt).

**Removing:** Individual (uncheck) or bulk (clear all via options menu with confirmation).

#### 5.3.2 Drinks Ingredients Tab (`/my-ingredients/drinks`)

Same UI pattern with drink-specific categories: Spirits, Liqueurs, Bitters, Mixers & Juices, Syrups & Sweeteners, Fruits & Garnishes, Herbs & Spices.

### 5.4 Kitchen Utilities

9 toggleable kitchen appliances that inform recipe generation:

| Utility | Default |
|---------|---------|
| Stove Top | On |
| Oven | On |
| Microwave | On |
| Blender | On |
| Air Fryer | Off |
| Food Processor | Off |
| Slow Cooker | Off |
| BBQ | Off |
| Grill | Off |

Persisted via `PATCH /user/kitchen-utils` with optimistic toggle. Displayed as Switch components in recipe creation Step 2.

### 5.5 Recipe Creation (`/create-recipe`)

**3-step wizard** with `IconStepper` (MUI Joy) progress indicator: Ingredients → Your kitchen → Final step.

#### Step 1: Choose Ingredients
- `ChooseIngredients` component (same as My Ingredients food tab)
- Route loader prefetches "Common" category suggestions
- **Minimum 4 food ingredients required**

#### Step 2: Kitchen & Preferences
- **Meal type** (select): Breakfast, Lunch, Dinner, Snack, Dessert (default: Lunch)
- **Number of people** (number input): 1–99 (default: 2)
- **Kitchen utilities** (switch toggles): 2-column grid
- **Cooking time** (slider): 10–120 minutes in 10-min increments (default: 50)

#### Step 3: Final Prompt
- Optional textarea (max 99 chars): dietary restrictions, allergies, preferences
- **"Create Recipe!" button** (amber/brown) triggers SSE generation

**Form validation (Zod):**
```typescript
{
  mealSelected: z.enum(["breakfast", "lunch", "dinner", "snack", "dessert"]),
  selectedTime: z.number().min(10).max(120),
  numOfPeople: z.number().int().min(1).max(99),
  prompt: z.string().max(99).optional()
}
```

**Generation flow:**
1. Validates ≥4 food ingredients in cache
2. `POST /user/recipes/create` (SSE)
3. Shows `LoadingRecipePage` with progress messages
4. SSE `recipe` event → recipe loaded; SSE `image` event → image loaded
5. Navigate to `/recipe` with recipe in location state

### 5.6 Cocktail Creation (`/create-cocktail`)

**2-step wizard** with emerald color theme.

#### Step 1: Choose Drink Ingredients
- `ChooseDrinks` component; route loader prefetches "Spirits" suggestions
- **Minimum 4 drink ingredients required**

#### Step 2: Final Prompt
- Optional textarea for additional instructions
- **"Create Recipe!" button** (violet/purple) triggers SSE generation

Same loading/streaming flow as recipe creation.

### 5.7 Recipe Viewer (`/recipe`)

Displays a newly generated recipe (passed via TanStack Router location state). Redirects to `/` if no data.

**Content:** Title, description, AI-generated image (Lottie animation while streaming), ingredients list (2-column desktop), step-by-step instructions.

**Actions (fixed bottom bar):**
- **"Add to My Recipes"** (disabled until image loads) → `POST /user/recipes` → navigate to `/my-recipes`
- **"Download PDF"** (after image loads) → html2pdf.js generates PDF with logo, image, ingredients, steps

### 5.8 My Recipes (`/my-recipes`)

- **Search**: Debounced 500ms, filters by recipe title
- **Filter**: All / Recipes / Cocktails
- **Sort**: Newest / Oldest / A-Z / Z-A (default: Newest)
- **URL-driven state**: Filter/sort/search params in URL as `?recipesView[q]=&recipesView[filterBy]=&recipesView[sortBy]=`
- **Infinite scroll**: 4 per page, Intersection Observer triggers next fetch
- Route loader prefetches first page

**Recipe card**: Lazy-loaded image, title, description, time, level. Click → `/user-recipe/{recipeId}`. Delete button → confirmation modal → optimistic cache delete.

### 5.9 Saved Recipe Viewer (`/user-recipe/$recipeId`)

**Data loading:**
1. If recipe in location state → use directly (no API call)
2. Otherwise → `GET /user/recipes/{recipeId}`

**Actions:**
- **Share**: Modal with Facebook, X (Twitter), WhatsApp, copy link options
- **Download PDF**: Same as recipe viewer

### 5.10 Subscription System (Planned/Partial)

`SubscribePage` component exists but is not routed. Contains:
- Monthly: $8.99/month
- Yearly: $89.99/year (20% savings)
- Feature: "Limitless cocktail creation"
- `useFetchSubscription` hook queries `GET /user/subscriptions/isSubscribed`

### 5.11 Theme System

- **Options**: Light, Dark, System
- **Persistence**: `localStorage` key `culinary-gpt-theme`
- **Toggle**: Dropdown in navbar
- **Implementation**: CSS class on document root

---

## 6. API Endpoints

All calls go to `VITE_API_URL`. Auth token injected automatically by Axios interceptor.

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/user/recipes/create` | Generate recipe (SSE) |
| POST | `/user/recipes/create-cocktail` | Generate cocktail (SSE) |
| GET | `/user/recipes` | List recipes (paginated) |
| GET | `/user/recipes/{id}` | Get recipe |
| POST | `/user/recipes` | Save recipe |
| DELETE | `/user/recipes/{id}` | Delete recipe |
| GET | `/user/ingredients` | Get pantry |
| POST | `/user/ingredients` | Add ingredient |
| POST | `/user/ingredients/multiple` | Bulk add |
| DELETE | `/user/ingredients/{id}` | Remove ingredient |
| DELETE | `/user/ingredients/all` | Clear pantry |
| GET | `/user/kitchen-utils` | Get equipment state |
| PATCH | `/user/kitchen-utils` | Toggle equipment |
| GET | `/user/subscriptions/isSubscribed` | Subscription status |
| GET | `/ingredients/suggestions/{category}` | Category suggestions |
| GET | `/ingredients/search` | Search by name + type |
| POST | `/ingredients/image-detect` | AI ingredient detection |

---

## 7. Data Models (Client-side TypeScript)

```typescript
type Recipe = {
  title: string;
  description: string;
  ingredients: { ingredient: string }[];
  steps: { step: string; time: string }[];
  time?: string;
  level: string;
  type: 'recipe' | 'cocktail';
  id: string;
}

type RecipeWithImage = {
  recipe: Recipe;
  image_url: string | null;
  id?: string;
  createdAt?: string | Date;
  userId?: string;
}

type Ingredient = {
  id: string;
  name: string;
  category: IngredientCategories | DrinksCategories;
  popularity?: number;
  type: ('food' | 'drink')[];
}

type KitchenUtils = {
  "Stove Top": boolean;
  "Oven": boolean;
  "Microwave": boolean;
  "Air Fryer": boolean;
  "Blender": boolean;
  "Food Processor": boolean;
  "Slow Cooker": boolean;
  "BBQ": boolean;
  "Grill": boolean;
}
```

---

## 8. User Flows

### 8.1 First-Time User
```
Landing (/) → "Get Started" → /create-recipe
  → Auth guard → /signin (no session)
  → Sign up → redirect to /create-recipe
```

### 8.2 Recipe Creation
```
/create-recipe
  → Step 1: Add ≥4 food ingredients
  → Step 2: Select meal type, servings, kitchen utils, time
  → Step 3: Optional prompt → "Create Recipe!"
  → Loading (SSE streaming)
  → /recipe: View generated recipe + image
  → "Add to My Recipes" → POST /user/recipes → /my-recipes
```

### 8.3 Cocktail Creation
```
/create-cocktail
  → Step 1: Add ≥4 drink ingredients
  → Step 2: Optional prompt → "Create Recipe!"
  → Loading (SSE streaming)
  → /recipe: View cocktail + image → save → /my-recipes
```

### 8.4 Browse & Manage Recipes
```
/my-recipes → Search/Filter/Sort → Infinite scroll
  → Click card → /user-recipe/:id
  → Share / Download PDF / Delete
```

---

## 9. Navigation Structure

### Navbar (Signed In)
- Logo (→ `/`)
- "Create New Recipe" button (orange, → `/create-recipe`)
- "Create A Cocktail" button (emerald, → `/create-cocktail`)
- "My Ingredients" link with animated badge count (→ `/my-ingredients/food`)
- "My Recipes" link (→ `/my-recipes`)
- Theme toggle dropdown (Light / Dark / System)
- User button → dropdown: profile info, "Sign out"

### Navbar (Signed Out)
- Logo, theme toggle, Sign In button

### Mobile
- Hamburger menu with same navigation items

---

## 10. Route Map

| Route | Auth | Description |
|-------|------|-------------|
| `/` | Public | Landing page |
| `/signin/$` | Public (redirects if signed in) | Sign in |
| `/create-recipe` | Protected | 3-step recipe creation wizard |
| `/create-cocktail` | Protected | 2-step cocktail creation wizard |
| `/recipe` | Protected | View newly generated recipe (location state) |
| `/my-recipes` | Protected | Browse saved recipes |
| `/my-ingredients` | Protected | Redirects to `/my-ingredients/food` |
| `/my-ingredients/food` | Protected | Manage food ingredients |
| `/my-ingredients/drinks` | Protected | Manage drink ingredients |
| `/user-recipe/:recipeId` | Protected | View saved recipe |

---

## 11. Design & Color Theming

| Feature | Color | Usage |
|---------|-------|-------|
| Recipe Creation | Orange / Amber | Stepper, buttons, accent backgrounds |
| Cocktail Creation | Emerald (green) | Stepper, navigation buttons, step circle |
| Cocktail Submit | Violet (purple) | "Create Recipe!" button on cocktail final step |
| My Recipes | Amber-100 / Zinc-700 | Page background |
| Ingredients Badge | Red-400 | Navbar ingredient count badge |

---

## 12. Non-Functional Requirements

- **Responsive design**: Mobile-first, breakpoints at `sm`, `md`, `lg`
- **Optimistic UI**: All mutations update cache immediately, rollback on error
- **Code splitting**: Automatic per-route via TanStack Router file-based routing
- **Route preloading**: On user intent (hover/focus)
- **Scroll restoration**: Enabled across route transitions
- **Error boundaries**: React Error Boundary with custom ErrorPage
- **Loading states**: Global LoadingPage (Lottie), per-feature spinners
- **Toast notifications**: Success/error feedback via Radix Toast
- **Dark mode**: Full theme support with system preference detection
- **Environment validation**: Runtime Zod validation of `VITE_API_URL`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
- **Request cancellation**: AbortController support for search and image detection
- **Rate limit handling**: Global 429 interception with user-facing toast

---

## 13. Future / Planned Features

- **Subscription tiers** (Monthly $8.99 / Yearly $89.99) with Stripe integration for "limitless cocktail creation" — `SubscribePage` and `useFetchSubscription` hook exist but are not yet routed
