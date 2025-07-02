/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
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
    ],
  },
};

export default nextConfig;
