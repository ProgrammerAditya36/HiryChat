import {defineConfig} from "drizzle-kit"
import {config} from "dotenv"
config({path:"./.env"})
export default defineConfig({
    schema:"./src/db/drizzle/schema.ts",
    out:"./src/db/drizzle/migrations",
    dialect:"postgresql",
    dbCredentials:{
        url:process.env.DATABASE_URL as string,
    },
    verbose:true,
    strict:true,
})