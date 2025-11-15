import type { NextConfig } from "next";
import withPWA from "next-pwa";

const nextConfig: NextConfig = {
  /* config options here */
};

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development", // Desabilita PWA em desenvolvimento
  runtimeCaching: [
    {
      urlPattern: /\.mp4$/,
      handler: "CacheFirst",
      options: {
        cacheName: "video-cache",
        expiration: {
          maxEntries: 10,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 dias
        },
      },
    },
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
      handler: "CacheFirst",
      options: {
        cacheName: "image-cache",
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 dias
        },
      },
    },
  ],
})(nextConfig);