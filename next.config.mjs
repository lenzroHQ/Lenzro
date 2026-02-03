/** @type {import('next').NextConfig} */

import mdx from "@next/mdx";
import withPWA from "next-pwa";

const withMDX = mdx({
  extension: /\.mdx?$/,
});

const nextConfig = {
  async headers() {
    return [
      {
        source:
          "/:all*(svg|jpg|jpeg|png|webp|gif|ico|woff2|woff|ttf|eot|js|css)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"],
};

const pwaConfig = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

export default withMDX(pwaConfig(nextConfig));
