import { z } from 'zod'

export const envSchema = z.object({
    NODE_ENV: z.coerce.string().min(3),
    TYPEORM_CONNECTION: z.coerce.string().min(3),
    API_PORT: z.coerce.number().optional().default(4000),
    DATABASE_NAME: z.coerce.string().min(1),
    DATABASE_USER: z.coerce.string().min(1),
    DATABASE_PASSWORD: z.coerce.string().min(1),
    DATABASE_PORT: z.coerce.number().min(4),
    DATABASE_HOST: z.coerce.string().min(1),
})
export type Env = z.infer<typeof envSchema>
