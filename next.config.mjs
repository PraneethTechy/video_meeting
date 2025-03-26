/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true, // Enables React strict mode
    swcMinify: true, // Enables SWC for faster builds
    eslint: {
      ignoreDuringBuilds: true, // Temporarily ignores ESLint errors during deployment
    },
    experimental: {
      appDir: true, // Required for Next.js App Router (if using app directory)
    },
    images: {
      domains: ['your-image-domain.com'], // Replace with your actual image domains if using Next.js Image
    },
    env: {
      NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL, // Ensure environment variables are passed correctly
    },
  };
  
  export default nextConfig;
  