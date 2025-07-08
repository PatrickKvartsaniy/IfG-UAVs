/** @type {import('next').NextConfig} */
const repo = 'IfG-UAVs'; // GitHub repo name
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: isProd ? `/${repo}` : '',
  assetPrefix: isProd ? `/${repo}/` : '',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
