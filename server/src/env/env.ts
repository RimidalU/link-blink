import { z } from 'zod'

export const envSchema = z.object({
    API_PORT: z.coerce.number().optional().default(4000),
    POSTGRES_DB: z.coerce.string().min(1),
    POSTGRES_USER: z.coerce.string().min(1),
    POSTGRES_PASSWORD: z.coerce.string().min(1),
    DB_PORT: z.coerce.number().min(4),
})
export type Env = z.infer<typeof envSchema>
