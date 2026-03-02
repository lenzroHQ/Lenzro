/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,

  serverExternalPackages: ["firebase", "firebase-admin"],

  async headers() {
    return [
      // 🔐 Firebase / Google Auth popup fix
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },
        ],
      },

      // 📦 Static asset caching (your original rule)
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

  pageExtensions: ["js", "jsx", "ts", "tsx"],
};

export default config;
