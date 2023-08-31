/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SITE_TITLE: process.env.SITE_TITLE,
    BASE_URL: process.env.BASE_URL,
    MY_SECRET_TOKEN: process.env.MY_SECRET_TOKEN,
  },
};

module.exports = nextConfig
