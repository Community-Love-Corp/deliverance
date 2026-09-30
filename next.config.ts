/*import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 
};

export default nextConfig;*/

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors or internal compiler bugs.
    ignoreBuildErrors: true,
  },
  experimental: {
    // Force production builds to use standard Webpack while leaving Turbopack for your dev server
  //  turbo: {
  //    rules: {}
  //  }
  }
};

export default nextConfig;
