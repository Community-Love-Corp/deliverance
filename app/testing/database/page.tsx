//Explicitly tell Next.js not to build it as a static page, as Next.js tries to statically compile your /testing/database page during the build phase, but it cannot read Netlify environment variables at that moment. 
export const dynamic = 'force-dynamic';

import { time } from 'console';
import { getDatabaseTime } from '../../../logicLayer/dbTest';
export default async function Home() {
	let outcome = "";
	try {
		/** @type {Date} */
		const data = await getDatabaseTime();
		const dataString = JSON.stringify(data);
		outcome = `Successfully connected! Database time: " ${dataString}`;
		console.log(outcome);
	} catch (error) {
		// IF error is an object, stringify it too, or extract its message
		const errorString = error instanceof Error ? error.message : JSON.stringify(error);
		outcome = "Database connection failed: "+ error;
		console.error(outcome);
	}

	
  return(
	<div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
		<h1>Troubleshoot Database Connection</h1>
		<br /><br /> 
		<p>{outcome}</p>
	</div>
  );
} 

//testConnection();  <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
