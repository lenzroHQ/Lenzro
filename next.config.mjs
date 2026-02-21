/** @type {import('next').NextConfig} */

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
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
  async rewrites() {
    return [
      {
        source: "/docs/:path*.mdx",
        destination: "/llms.mdx/docs/:path*",
      },
    ];
  },
};

export default config;
