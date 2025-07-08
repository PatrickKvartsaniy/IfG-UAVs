/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true
  },
  // Handle GitHub Pages subdirectory deployment
  basePath: process.env.NODE_ENV === 'production' ? '/uav-study-web-app' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/uav-study-web-app/' : '',
}

export default nextConfig
