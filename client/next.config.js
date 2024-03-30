const { i18n } = require("./next-i18next.config");

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        hostname: "**",
      },
    ],
  },
  trailingSlash: true,
  outputFileTracing: true,
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
};

module.exports = nextConfig;
