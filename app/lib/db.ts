import postgres from 'postgres'

const sql = postgres(process.env.DATABASE_URL!, {
  host: 'aws-0-us-east-2.pooler.supabase.com',
  port: 5432,
  database: 'postgres',
  username: 'postgres.bkgxtohtczfaznjioqer',
  max: 10,
  idle_timeout: 20,
  connect_timeout: 10
})

export default sql
