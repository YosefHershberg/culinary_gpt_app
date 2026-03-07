# CulinaryGPT - Product Requirements Document (PRD)

## 1. Product Overview

**CulinaryGPT** is an AI-powered recipe generation web application that creates personalized recipes and cocktails based on the ingredients users have at home. Users manage their ingredient inventory, configure kitchen utilities, and receive AI-generated recipes complete with images -- all delivered via real-time streaming.

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
| Auth | Clerk |
| HTTP | Axios (interceptor-based auth) |
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
    _auth/          # Protected routes (require authentication)
  pages/            # Route-level page components
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
  config/           # Axios & React Query clients
  lib/              # Types, enums, query keys
  utils/            # Environment validation
```

### 4.2 Provider Hierarchy

```
QueryClientProvider
  ThemeProvider
    ClerkProvider
      AuthProvider              # Axios interceptors (Bearer token, 429 handling)
        TooltipProvider
          [Router]
            FeaturesProviders   # Only for signed-in users
              UserDataProvider   # Ingredients + Kitchen Utils (suspense queries)
                CreateRecipeProvider    # Recipe form + SSE stream
                  CreateCocktailProvider # Cocktail prompt + SSE stream
```

### 4.3 Key Architectural Patterns

- **Optimistic Mutations**: Cancel pending queries -> update cache -> mutate -> rollback on error -> invalidate on settle. Used for ingredient CRUD, kitchen utils toggle, recipe delete.
- **SSE Streaming Chain**: `useSSE` (raw stream) -> `useCreateItemStream` (tracks `recipe` + `image` events with separate loading states) -> context provider (validation + submission + navigation).
- **Infinite Scroll**: `useInfiniteQuery` + Intersection Observer with sentinel ref. 4 recipes per page.
- **Route Preloading**: TanStack Router `intent` strategy. Loaders prefetch ingredient suggestions and recipe pages.
- **Component Reuse**: `ChooseIngredients` and `ChooseDrinks` are shared between creation flows and the My Ingredients page.

---

## 5. Features

### 5.1 Authentication

| Aspect | Detail |
|--------|--------|
| Provider | Clerk |
| Methods | Email/password, social login (configured in Clerk dashboard) |
| Route Protection | `beforeLoad` guard in `_auth/route.tsx` checks `context.auth.user` |
| Redirect Logic | If `localStorage.hasAuthed` exists -> `/signin`, otherwise -> `/signup` |
| Token Injection | Axios request interceptor adds `Authorization: Bearer {token}` to all API calls |
| Rate Limiting | Axios response interceptor catches 429 -> shows toast "Too many requests" |

**Routes:**
- `GET /signin/$` - Clerk SignIn component (redirects home if already signed in)
- `GET /signup/$` - Clerk SignUp component (redirects home if already signed in)
- Both accept `?redirect=` search param to return user to original destination

### 5.2 Landing Page (`/`)

Public page with:
- **Hero section**: Animated slide-in (Framer Motion spring) with headline ("We'll find you perfect dish to prepare!"), tagline about AI-powered recommendations, and kitchen tools illustration
- **CTA**: "Get Started" button (orange, rounded-full) -> `/create-recipe`
- **Learn More**: Opens `MoreInfoModal` — a dialog with the CulinaryGPT logo and a description: "CulinaryGPT is your AI-powered kitchen assistant, offering personalized recipes based on your ingredients. With text or image input, step-by-step instructions, and tools to save and organize recipes, it makes cooking simple and enjoyable."
- **About section**: "FEATURES" label, "Discover the Features" heading, 4 cards with hover effect:
  1. AI-Powered Recipe Suggestions
  2. Ingredient Recognition (text + image)
  3. Step-by-Step Instructions
  4. Save and Organize Recipes
- **Footer**: Logo, tagline ("Cook Smarter, Eat Better: Your AI Recipe Companion"), copyright

### 5.3 Ingredient Management (`/my-ingredients`)

Users maintain a personal inventory of food and drink ingredients used for recipe/cocktail generation.

**Layout:**
- Desktop: Sidebar with "Ingredients" and "Drinks" tabs + content area
- Mobile: Floating bottom-left dropdown menu for tab switching
- Auto-redirects to `/my-ingredients/food` on initial load

#### 5.3.1 Food Ingredients Tab (`/my-ingredients/food`)

**Adding ingredients via:**

1. **Search**: Animated search bar (`PlaceholdersAndVanishInput`) that cycles through placeholder text (e.g., "Cocoa Powder", "Peanut Butter", "Canola oil"). On submit calls `GET /ingredients/search?query=&type=food`. Shows dropdown with results. Prevents duplicate additions with toast warning.

2. **Category Suggestions**: Tabbed interface with categories:
   - Common, Dairy, Vegetables, Spices, Carbs, Meat
   - Each tab lazy-loads suggestions from `GET /ingredients/suggestions/{category}`
   - Checkbox UI (`OptionCheckbox`) to toggle ingredients on/off -- checked ingredients are shown as added
   - Sortable by: Popularity, Alphabetical, None

3. **Image Detection**: Camera icon button opens `ImageDetectorModal` dialog with 3 states:
   - `UploadState`: File upload interface to select an image
   - `LoadingState`: Spinner while AI processes the image
   - `DetectedIngredientsList`: Checkboxes for each detected ingredient with bulk select/deselect all and "Add" button
   - Converts image to base64 -> `POST /ingredients/image-detect` -> returns detected `Ingredient[]`

4. **Ingredient Options Menu**: Hamburger icon (next to search bar) opens a dropdown with:
   - "Clear all ingredients" -> opens `ClearIngredientsModal` confirmation dialog -> `DELETE /user/ingredients/all`
   - "Add all common ingredients" -> bulk-adds all common category ingredients
   - "Sort by.." submenu -> Name / Popularity / None

5. **Add Common Ingredients Modal**: Auto-opens when user has fewer than 5 ingredients (onboarding prompt). Asks "Would you like to add some common ingredients?" with "Yes please!" and "Cancel" buttons. Quickly populates the ingredient list for new users.

**Removing ingredients:**
- Individual delete via checkbox toggle (unchecking a checked ingredient)
- "Clear all ingredients" via the options menu dropdown (with confirmation modal)

**Data model:**
```typescript
type Ingredient = {
    id: string;
    name: string;
    category: IngredientCategories;
    popularity?: number;
    type: IngredientType[];  // ['food'] | ['drink'] | ['food', 'drink']
}
```

#### 5.3.2 Drinks Ingredients Tab (`/my-ingredients/drinks`)

Same UI pattern as food, with drink-specific categories:
- Spirits, Liqueurs, Bitters, Mixers & Juices, Syrups & Sweeteners, Fruits & Garnishes, Herbs & Spices

### 5.4 Kitchen Utilities

9 toggleable kitchen appliances that inform recipe generation:

| Utility | Default |
|---------|---------|
| Stove Top | Off |
| Oven | Off |
| Microwave | Off |
| Air Fryer | Off |
| Blender | Off |
| Food Processor | Off |
| Slow Cooker | Off |
| BBQ | Off |
| Grill | Off |

- Persisted via `PATCH /user/kitchen-utils` with optimistic toggle
- Displayed as Switch components in the recipe creation flow (Step 2)

### 5.5 Recipe Creation (`/create-recipe`)

**3-step wizard form** with `IconStepper` progress indicator (MUI Joy Stepper) showing: Ingredients -> Your kitchen -> Final step. Steps are clickable to jump between them. Large numbered circle (1/2/3) shown on desktop left side.

#### Step 1: Choose Ingredients
- Same `ChooseIngredients` component as My Ingredients food tab
- Route loader prefetches "Common" category suggestions
- **Minimum 4 food ingredients required** to proceed
- Heading: "Add the ingredients you have at home."

#### Step 2: Kitchen & Preferences ("What else?")
- **Meal type** (select): Breakfast, Lunch, Dinner, Snack, Dessert (default: Lunch)
- **Number of people** (number input): 1-99 (default: 2)
- **Kitchen utilities** (switch toggles): Toggle available appliances (2-column grid)
- **Cooking time** (slider): 10-120 minutes in 10-min increments (default: 50). Shows "120+" for max value.
- Each section separated by horizontal dividers

#### Step 3: Final Prompt ("Almost done..")
- Heading: "Message to the chef?"
- Hint: "Such as dietary restriction, allergies, etc."
- **Optional text prompt** (textarea, max 99 chars): Dietary restrictions, allergies, preferences
- Note: "Your prompt will be added to the recipe generation."
- **"Create Recipe!" button** (amber/brown styled) triggers generation

**Form validation (Zod):**
```typescript
recipeFormSchema = z.object({
    mealSelected: z.enum(["breakfast", "lunch", "dinner", "snack", "dessert"]),
    selectedTime: z.number().min(10).max(120),
    numOfPeople: z.number().int().positive().min(1).max(99),
    prompt: z.string().max(99).optional().or(z.literal('')),
});
```

**Generation flow:**
1. Validates >= 4 food ingredients in cache
2. Sends `POST /user/recipes/create` (SSE) with form data
3. Shows `LoadingRecipePage` with multi-step progress messages:
   - "Sending your recipe request"
   - "Your request has been received by the AI chef"
   - "This process usually takes 5 seconds"
   - "The AI chef is creating the recipe"
   - "Double checking the recipe for you"
   - "Almost done..."
   - "Sending your recipe to you"
4. Receives SSE event `recipe` -> recipe data loaded
5. Receives SSE event `image` -> AI-generated image loaded
6. Navigates to `/recipe` with recipe in location state

### 5.6 Cocktail Creation (`/create-cocktail`)

**2-step wizard** with green (emerald) color theme throughout (stepper, buttons, step circle).

#### Step 1: Choose Drink Ingredients
- Same `ChooseDrinks` component as My Ingredients drinks tab
- Route loader prefetches "Spirits" category suggestions
- **Minimum 4 drink ingredients required**
- Heading: "What cocktail ingredients do you have?"

#### Step 2: Final Prompt ("Almost done..")
- Heading: "Anything else to add?"
- Hint: "Write a message about anything else you would like th AI to know about!"
- Optional textarea for additional instructions
- **"Create Recipe!" button** (violet/purple styled, distinct from recipe creation) triggers generation

**Generation flow:**
1. Validates >= 4 drink ingredients
2. Sends `POST /user/recipes/create-cocktail` (SSE) with `{ prompt }`
3. Same loading/streaming flow as recipe creation
4. Navigates to `/recipe` with cocktail in location state

### 5.7 Recipe Viewer (`/recipe`)

Displays a newly generated recipe (passed via location state). Redirects to `/` if no recipe data.

**Content:**
- Recipe title and description
- AI-generated image (clickable to open full-size modal). Shows Lottie loading animation while image streams.
- Ingredients list (2-column grid on desktop)
- Step-by-step instructions (ordered list)
- "Bon Appetit!" footer text

**Actions (fixed bottom bar):**
- **"Add to My Recipes"** button (disabled until image loads) -> `POST /user/recipes` -> navigates to `/my-recipes`
- **"Download PDF"** button (visible after image loads) -> generates PDF via html2pdf.js with recipe layout including logo, image, ingredients, and instructions

### 5.8 My Recipes (`/my-recipes`)

**Listing features:**
- **Search**: Debounced text search (500ms) -> filters by recipe title
- **Filter**: All / Recipes / Cocktails
- **Sort**: Newest / Oldest / A-Z / Z-A (default: Newest)
- **URL-driven state**: All filter/sort/search params retained in URL as `?recipesView[q]=&recipesView[filterBy]=&recipesView[sortBy]=`
- **Infinite scroll**: 4 recipes per page, Intersection Observer triggers next page fetch
- Route loader prefetches first page of recipes

**Recipe card** (responsive: horizontal on desktop, vertical stack on mobile):
- `LazyImage` (lazy-loaded with loading state), title, description, cooking time, difficulty level
- Click -> navigates to `/user-recipe/{recipeId}` (passes recipe via location state for instant display)
- Delete button (X icon, top-right) -> opens confirmation modal -> optimistic delete from cache
- Note: uses `onClick` + `navigate` instead of `<Link>` to prevent navigation on delete button click propagation

**Empty states:**
- "No recipes found" with CTA to create a recipe
- "No cocktails found" (when filtered to cocktails) with CTA to create a cocktail

### 5.9 Saved Recipe Viewer (`/user-recipe/$recipeId`)

Displays a previously saved recipe.

**Data loading strategy:**
1. If recipe exists in location state (navigated from My Recipes) -> use directly, skip API call
2. Otherwise -> fetch from `GET /user/recipes/{recipeId}`

**Content:** Same as Recipe Viewer but without "Add to My Recipes" button.

**Actions:**
- **Share** (modal): Title "How Would you like to share your recipe?" with social platform buttons showing logos -- Facebook, X (Twitter), WhatsApp -- plus a "Copy link" option. Each closes the modal after action. Copy triggers toast "Link copied to clipboard".
- **Download PDF**: Same as recipe viewer

### 5.10 Subscription System (Planned/Partial)

A `SubscribePage` component exists but is not routed. Contains:
- Monthly plan: $8.99/month
- Yearly plan: $89.99/year (20% savings)
- Feature: "Limitless cocktail creation"
- Stripe checkout integration (test/production URLs based on NODE_ENV)
- `useFetchSubscription` hook queries `GET /user/subscriptions/isSubscribed`

### 5.11 Theme System

- **Options**: Light, Dark, System (follows OS preference)
- **Persistence**: `localStorage` key `culinary-gpt-theme`
- **Toggle**: Dropdown in navbar (Sun/Moon/Monitor icons)
- **Implementation**: CSS class applied to document root

---

## 6. API Endpoints

### 6.1 User Ingredients

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/user/ingredients` | Get all user ingredients |
| POST | `/user/ingredients` | Add single ingredient |
| POST | `/user/ingredients/multiple` | Add multiple ingredients |
| DELETE | `/user/ingredients/{id}` | Delete single ingredient |
| DELETE | `/user/ingredients/all` | Delete all ingredients |

### 6.2 Ingredient Discovery

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/ingredients/suggestions/{category}` | Get suggestions by category |
| GET | `/ingredients/search?query=&type=` | Search ingredients by name and type |
| POST | `/ingredients/image-detect` | Detect ingredients from base64 image |

### 6.3 Kitchen Utilities

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/user/kitchen-utils` | Get user's kitchen utility states |
| PATCH | `/user/kitchen-utils` | Toggle a kitchen utility |

### 6.4 Recipes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/user/recipes?page=&limit=&filter=&sort=&query=` | List recipes (paginated) |
| GET | `/user/recipes/{id}` | Get single recipe |
| POST | `/user/recipes` | Save a recipe |
| DELETE | `/user/recipes/{id}` | Delete a recipe |

### 6.5 Recipe Generation (SSE)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/user/recipes/create` | Generate recipe via SSE stream |
| POST | `/user/recipes/create-cocktail` | Generate cocktail via SSE stream |

**SSE event format:**
```json
{ "event": "recipe", "payload": "<Recipe object>" }
{ "event": "image", "payload": "<image URL string>" }
{ "event": "error", "payload": "<error message>" }
```

### 6.6 User / Subscription

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/user/subscriptions/isSubscribed` | Check subscription status |

---

## 7. Data Models

### Recipe
```typescript
type Recipe = {
    title: string;
    description: string;
    ingredients: { ingredient: string }[];
    steps: { step: string; time: string }[];
    time?: string;
    level: string;           // difficulty level
    type: 'recipe' | 'cocktail';
    id: string;
}
```

### RecipeWithImage
```typescript
type RecipeWithImage = {
    recipe: Recipe;
    image_url: string | null;
    id?: number | string;
    createdAt?: string | Date | number;
    userId?: string;
}
```

### Ingredient
```typescript
type Ingredient = {
    id: string;
    name: string;
    category: IngredientCategories | DrinksCategories;
    popularity?: number;
    type: ('food' | 'drink')[];
}
```

### KitchenUtils
```typescript
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
Landing Page (/) -> "Get Started" -> /create-recipe
  -> Auth guard -> /signup (no hasAuthed in localStorage)
  -> Sign up via Clerk -> sets hasAuthed -> redirect to /create-recipe
```

### 8.2 Returning User
```
Any protected route -> Auth guard -> /signin (hasAuthed exists)
  -> Sign in -> redirect to original route
```

### 8.3 Recipe Creation
```
/create-recipe
  -> Step 1: Add >= 4 food ingredients (search, suggestions, or image detection)
  -> Step 2: Select meal type, servings, kitchen utils, cooking time
  -> Step 3: Optional prompt -> "Create Recipe!"
  -> Loading screen (SSE streaming)
  -> /recipe: View generated recipe + image
  -> "Add to My Recipes" -> POST /user/recipes -> /my-recipes
```

### 8.4 Cocktail Creation
```
/create-cocktail
  -> Step 1: Add >= 4 drink ingredients
  -> Step 2: Optional prompt -> "Create Recipe!"
  -> Loading screen (SSE streaming)
  -> /recipe: View generated cocktail + image
  -> "Add to My Recipes" -> /my-recipes
```

### 8.5 Browse & Manage Recipes
```
/my-recipes -> Search/Filter/Sort -> Infinite scroll
  -> Click recipe card -> /user-recipe/:id -> View recipe
  -> Share (Facebook/Twitter/WhatsApp/Copy Link)
  -> Download PDF
  -> Delete recipe (with confirmation)
```

### 8.6 Ingredient Management
```
/my-ingredients -> Food tab or Drinks tab
  -> Search for ingredients
  -> Browse category suggestions
  -> Upload image for AI detection
  -> Add/remove individual or bulk ingredients
```

---

## 9. Navigation Structure

### Navbar (Signed In)
- Logo (-> `/`)
- "Create New Recipe" button (orange, -> `/create-recipe`)
- "Create A Cocktail" button (emerald, -> `/create-cocktail`)
- "My Ingredients" link with animated badge count (-> `/my-ingredients/food`). Badge shows ingredient count (capped at "99+"). Brief scale animation on count change.
- "My Recipes" link (-> `/my-recipes`). Active route highlighted with bg-zinc-200/700.
- Theme toggle dropdown: "Theme" header with Light (sun), Dark (moon), System (monitor) options
- User button (avatar or initials) -> dropdown showing: profile image, full name, email, "Manage Account" (opens Clerk UserProfile modal), "Sign out", CulinaryGPT logo at bottom

### Navbar (Signed Out)
- Logo (-> `/`)
- Theme toggle
- Sign In / Sign Up buttons

### Mobile
- Hamburger menu with same navigation items
- My Ingredients page: floating bottom-left dropdown for Food/Drinks tab switching

---

## 10. Route Map

| Route | Auth | Description |
|-------|------|-------------|
| `/` | Public | Landing page |
| `/signin/$` | Public (redirects if signed in) | Clerk sign-in |
| `/signup/$` | Public (redirects if signed in) | Clerk sign-up |
| `/create-recipe` | Protected | 3-step recipe creation wizard |
| `/create-cocktail` | Protected | 2-step cocktail creation wizard |
| `/recipe` | Protected | View newly generated recipe (location state) |
| `/my-recipes` | Protected | Browse saved recipes with search/filter/sort |
| `/my-ingredients` | Protected | Redirects to `/my-ingredients/food` |
| `/my-ingredients/food` | Protected | Manage food ingredients |
| `/my-ingredients/drinks` | Protected | Manage drink ingredients |
| `/user-recipe/:recipeId` | Protected | View saved recipe by ID |

---

## 11. Design & Color Theming

Each major feature has a distinct color identity:

| Feature | Primary Color | Usage |
|---------|--------------|-------|
| Recipe Creation | Orange / Amber | Stepper, buttons, accent backgrounds |
| Cocktail Creation | Emerald (green) | Stepper, navigation buttons, step circle |
| Cocktail Submit | Violet (purple) | "Create Recipe!" button on cocktail final step |
| My Recipes | Amber-100 / Zinc-700 | Page background |
| Recipe Viewer | Orange/20 | Card background, "Bon Appetit!" in amber-800 |
| Ingredients Badge | Red-400 | Navbar ingredient count badge |

The app uses `bg-amber-100` for light mode page backgrounds and `bg-zinc-700` for dark mode across recipe-related pages.

---

## 12. Non-Functional Requirements

- **Responsive design**: Mobile-first, breakpoints at `sm`, `md`, `lg`
- **Optimistic UI**: All mutations update cache immediately, rollback on error
- **Code splitting**: Automatic per-route via TanStack Router file-based routing
- **Route preloading**: On user intent (hover/focus)
- **Scroll restoration**: Enabled across route transitions
- **Error boundaries**: React Error Boundary with custom ErrorPage (status code, retry, go home)
- **Loading states**: Global LoadingPage (Lottie animation), per-feature loading spinners
- **Toast notifications**: Success/error feedback via Radix Toast
- **Dark mode**: Full theme support with system preference detection
- **Environment validation**: Runtime Zod validation of env vars (`VITE_API_URL`, `VITE_CLERK_PUBLISHABLE_KEY`)
- **Request cancellation**: AbortController support for search and image detection APIs
- **Rate limit handling**: Global 429 response interception with user-facing toast

---

## 13. Future / Planned Features

Based on existing code artifacts:
- **Subscription tiers** (Monthly $8.99 / Yearly $89.99) with Stripe integration for "limitless cocktail creation"
- `SubscribePage` component and `useFetchSubscription` hook exist but are not yet routed
