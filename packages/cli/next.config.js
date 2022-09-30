module.exports = {
  eslint: {
    ignoreDuringBuilds: !process.env.MM_DEV,
  },
  async redirects() {
    return [
      {
        source: "/login",
        destination: `http://localhost:3000/login/oauth/authorize?client_id=${process.env.MAILING_OAUTH_CLIENT_ID}&scope=user`,
        permanent: true,
      },
    ];
  },
};
