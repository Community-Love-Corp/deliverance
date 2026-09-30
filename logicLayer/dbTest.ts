//Example async query function getDatabaseTime()
import { getSqlClient } from '../db' 
export async function getDatabaseTime(){
	const sql = getSqlClient();
	const result = await sql`SELECT NOW();`;
	return result;
}
