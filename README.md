# CulinaryGPT Frontend

## Description

CulinaryGPT is a recipe generation application that allows the user to generate recipes based on the user's ingredients and kitchen utensils. This application is build with scalability, re-usability & maintainability in mind by implementing a clean and layard architecture.

## Features

- Easy onboarding with google account (using Clerk)
- Recipe generation and display
- Save recipes, filter, sort & query through them
- Share recipes on social platforms
- Cocktails too !
- image upload and detection of appearing ingredients
- Optimistic updates with React Query caching
- Styling & Responsive design with Tailwind CSS
- Component library with Shadcn-UI
- Clean layered architecture for maintainability, scalability & team work

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **React Query**: For data fetching and state management.
- **Clerk**: Authentication and user management.
- **Tanstack Router**: Routing, prefetching, code-splitting & params handling.
- **Tailwind CSS**: Utility-first CSS framework.
- **Shadcn-UI**: Component library for consistent UI.
- **TypeScript**: Static type checking for JavaScript.

## Get Started

To install the dependencies run - 

```console
npm install
```

To start the server run - 

```console
npm start
```

To run development server -

```console
npm run dev
```


## Project Structure

```plaintext
├── public
├── src
│   ├── assets
│   ├── components
│   ├── config
│   ├── context
│   ├── hooks
│   ├── lib
│   ├── pages
│   ├── routes
│   ├── services
│   ├── utils
│   ├── App.tsx
│   ├── index.css
│   ├── main.ts
│   ├── Providers.ts
│   ├── router.ts
│   ├── routerTree.gen.ts
│   └── vite-end.d.ts
├── .env
├── .eslintrc.cjs
├── .gitignore
├── components.json
├── index.html
├── package.json
├── pnpm-lock.yaml
├── postcss.config.js
├── README.md
├── tailwind.config.js
├── tsconfig.json
├── vercel.json
└── README.md