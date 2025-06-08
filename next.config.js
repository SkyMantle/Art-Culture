const config = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'art.playukraine.com',
        pathname: '/**',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
};

export default config;
