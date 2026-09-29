import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';

//Load environment variables from .env file
dotenv.config();

// Create the SQL connection client
const sql = neon(process.env.DATABASE_URL!);

//Example async query function getDatabaseTime()
export async function getDatabaseTime(){
	const result = await sql`SELECT NOW();`;
	return result;
}


