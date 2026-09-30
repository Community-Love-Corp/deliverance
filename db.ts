import { neon, type NeonQueryFunction } from '@neondatabase/serverless';

// Explicitly type the client instead of using 'any'
let sqlClient: NeonQueryFunction<boolean, boolean> | null = null;

export function getSqlClient(): NeonQueryFunction<boolean, boolean> {
  if (!sqlClient) {
    const url = process.env.DATABASE_URL;
    
    if (!url) {
      // Safe fallback string prevents the builder from crashing on missing URLs
      console.warn("Warning: DATABASE_URL is missing during build context.");
      return neon("postgresql://placeholder_for_build_step");
    }
    
    sqlClient = neon(url);
  }
  return sqlClient;
}
