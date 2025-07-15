/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: [
    "dentalnepal.com",
    "www.dentalnepal.com",
    "gargdental.vercel.app",
    "localhost:3000",
  ],
  async redirects() {
    return [
      {
        source: "/index.php",
        destination: "/dashboard",
        permanent: true,
      },
      {
        source: "/index.plx",
        destination: "/dashboard",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https", //for server host for local change to http
        hostname: "gargdemo.omsok.com", //for server host for local change api url
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "garg.omsok.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "gargdental.omsok.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "dentalnepal.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "dentalnepal.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "gargdental.vercel.app",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
