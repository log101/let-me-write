const withNextIntl = require('next-intl/plugin')();

/** @type {import('next').NextConfig} */
module.exports = withNextIntl({
  reactStrictMode: true,
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '**',
      },
    ],
  },
});
