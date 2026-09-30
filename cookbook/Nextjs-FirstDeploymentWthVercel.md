
# First Deployment using Vercel

## AIM
I have purchased a new domain called https://www.deliverance.tech from fastcomet. I wish to deploy my attached next.js project (has opeational connection to PostGres Db in Neon) using vercel into neon cloud platform without use of AI agents, on that https://www.deliverance.tech. Following are step by step instructions, taking into account, this is my first time using vercel.

![Project to be deployed onto Vercel](./screenshots/ProjectToBeDeployed.jpg)


## Response

Deploying your Next.js project to Vercel and connecting it to your Neon PostgreSQL database with a custom FastComet domain is completely straightforward and can be fully completed manually using the official web dashboards.
Follow this step-by-step breakdown to get everything running perfectly.
------------------------------
### Step 1: Push Your Project to GitHub
Vercel relies on a git provider to sync and deploy your application automatically whenever you update your code.

   1. Log into your [GitHub](https://github.com/) account.
   2. Click New Repository, name it (e.g., deliverance), set it to Private or Public, and create it. Do not initialize it with a README or .gitignore, as your project already has them.
   3. Open a terminal in your project's root folder (deliverance) on your computer and run these commands to upload your files:
   
   git init
   git add .
   git commit -m "initial commit"
   git branch -M main
   git remote add origin https://github.com
   git push -u origin main
   
   
------------------------------
### Step 2: Extract Your Neon Database Connection String
Since your database is already set up and operational in Neon, you just need its credentials.

   1. Log into your dashboard on the Neon Cloud Platform.
   2. Select your project and look for the Connection String box on the main dashboard tab.
   3. Ensure the dropdown is set to Node.js or Prisma/Standard depending on your code syntax, and copy the full URL string. It will look similar to this:
   postgres://alex:PASSWORD@ep-cool-darkness-123456.us-east-2.aws.neon.tech/neondb?sslmode=require

------------------------------
### Step 3: Deploy the Project on Vercel
Now you will import the GitHub repository into Vercel and configure your environment variables.

   1. Go to [Vercel](https://vercel.com) and sign up using your GitHub account.
   2. Once inside the Vercel dashboard, click the Add New... button and select Project.
   3. Under "Import Git Repository", find your deliverance repository and click Import.
   4. In the configuration window:
   * Leave the Framework Preset as Next.js.
      * Leave the Root Directory as default.
      * Expand the Environment Variables section. Open the local .env file visible in your VS Code workspace, copy the variable keys (e.g., DATABASE_URL or POSTGRES_URL), and paste them here along with the connection string you retrieved from Neon in Step 2.
   5. Click Deploy. Vercel will build your Next.js application. Once finished, you will get a confirmation screen with a preview link (e.g., deliverance.vercel.app).

------------------------------
### Step 4: Map Your FastComet Domain (deliverance.tech)
To point your custom domain from FastComet over to Vercel:

   1. In your Vercel Project Dashboard, go to Settings > Domains.
   2. Type www.deliverance.tech (or deliverance.tech) into the input box and click Add.
   3. Vercel will analyze the domain and show an error box detailing the exact DNS Records you need to add (an A Record for the root domain and a CNAME Record for the www subdomain). Keep this window open.

------------------------------
### Step 5: Configure DNS Records inside FastComet

   1. Log into your [FastComet Client Area](https://my.fastcomet.com).
   2. Navigate to your cPanel or DNS Zone Editor associated with deliverance.tech.
   3. Locate the Zone Editor (sometimes called DNS Manager).
   4. Update or add the following records based on what Vercel displayed in Step 4:
   * Root Domain (deliverance.tech): Add an A Record pointing to Vercel's IP address: 76.76.21.21
      * Subdomain (www.deliverance.tech): Add a CNAME Record pointing to ://vercel-dns.com.
   5. Save your changes.

Note: DNS updates can take anywhere from a few minutes up to a couple of hours to fully propagate worldwide. Once updated, go back to Vercel, hit Refresh, and you will see a green "Valid Configuration" status. Your website will now be completely live at https://www.deliverance.tech.
Please let me know:

* 
* What specific library or ORM (like Prisma, Drizzle, or raw pg) are you using inside db.ts to talk to Neon?
* What variable name is your db.ts file looking for (e.g., DATABASE_URL)?
* 

If you run into any build errors during the Vercel deployment stage, paste the log errors here and I can help you debug them!



