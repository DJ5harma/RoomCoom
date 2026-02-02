import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	// rewrites() {
	// 	return [
	// 		{
	// 			source: "/api/:path*",
	// 			destination: "http://localhost:3000/api/:path*",
	// 		},
	// 	];
	// },
	 images: {
    remotePatterns: [new URL('https://lh3.googleusercontent.com/a/**')],
  },
};

export default nextConfig;
