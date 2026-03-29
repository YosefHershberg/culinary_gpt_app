import { z } from 'zod';

const envData = import.meta.env

const envSchema = z.object({
    VITE_API_URL: z.string().url(),
    VITE_SUPABASE_URL: z.string().url(),
    VITE_SUPABASE_ANON_KEY: z.string(),
})

const parsedResults = envSchema.safeParse(envData)

if (!parsedResults.success) {
    console.error(parsedResults.error)
    throw new Error('Environment variables are not correctly set')
}

const env = { NODE_ENV: envData.MODE, ...parsedResults.data }

export default env;