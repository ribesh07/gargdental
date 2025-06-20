/** @type {import('next').NextConfig} */
const nextConfig = {
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
    ],
  },
  experimental: {
    // Add the IP or hostname you access from
    allowedDevOrigins: ["http://172.23.112.1:3000"],
  },
};

export default nextConfig;
