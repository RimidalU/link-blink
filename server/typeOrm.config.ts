import { config } from 'dotenv'
import { DataSource } from 'typeorm'

config({
    path: '.env',
})

export default new DataSource({
    type: process.env.TYPEORM_CONNECTION as 'postgres',
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    ssl: process.env.NODE_ENV === 'development',
    entities: [__dirname + '/src/**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/src/database/migrations/**/*{.ts,js}'],
})
