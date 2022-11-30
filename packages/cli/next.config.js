module.exports = {
  eslint: {
    ignoreDuringBuilds:
      process.env.MM_ENV === "development" || process.env.MM_ENV === "test",
  },
};
