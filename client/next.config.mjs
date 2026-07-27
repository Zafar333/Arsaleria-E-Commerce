/** @type {import('next').NextConfig} */
console.log("next.config.mjs loaded");
const nextConfig = {
  /* config options here */
  reactCompiler: true,
    images: {
    remotePatterns: [
      
      // new URL("https://res.cloudinary.com/**"),
    
      {
        protocol: "https",
        hostname: "res.cloudinary.com"
            // pathname: "**",
            // pathname: "/tbf1ausw/**",
      },
    ],
  },
};

export default nextConfig;
