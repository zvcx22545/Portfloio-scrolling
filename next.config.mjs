/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },
  images: {
    formats: ["image/webp"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
