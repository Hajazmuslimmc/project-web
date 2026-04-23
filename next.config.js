/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/search',
        destination: '/Search',
        permanent: false,
      },
      {
        source: '/NetTiers',
        destination: 'https://comptiersmc.web.app/',
        permanent: false,
      },
      {
        source: '/CompTier',
        destination: 'https://comptiersmc.web.app/',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
