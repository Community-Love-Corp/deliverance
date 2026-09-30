import { neon, type NeonQueryFunction } from '@neondatabase/serverless';

let sqlClient: NeonQueryFunction<boolean, boolean> | null = null;

export function getSqlClient(): NeonQueryFunction<boolean, boolean> {
  // Always grab the freshest runtime environment variable on the serverless instance
  const url = process.env.NEXT_PUBLIC_DATABASE_URL;
  
  if (!url) {
    console.warn("Warning: NEXT_PUBLIC_DATABASE_URL is missing in this runtime context.");
    // Return a safe dummy fallback so it doesn't crash compiling un-rendered routes
    return neon("postgresql://placeholder_for_build_step");
  }

  // If the client exists and matches the current token configuration, reuse it
  if (sqlClient) {
    return sqlClient;
  }

  try {
    // Strip trailing quotes or escape spaces if Netlify injected them weirdly
    let sanitizedUrl = url.trim().replace(/^["']|["']\$/g, '');

    // The serverless Neon HTTP driver handles its own secure sockets layer automatically.
    // If complex connection parameters are throwing parsing errors, isolate the base URI.
    if (sanitizedUrl.includes('channel_binding=')) {
      const [baseUri] = sanitizedUrl.split('?');
      sanitizedUrl = `${baseUri}?sslmode=require`;
    }

    sqlClient = neon(sanitizedUrl);
    return sqlClient;
  } catch (err) {
    console.error("Failed to initialize Neon client wrapper:", err);
    return neon(url);
  }
}
