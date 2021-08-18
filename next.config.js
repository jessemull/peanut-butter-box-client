const withPlugins = require('next-compose-plugins')
const optimizedImages = require('next-optimized-images')

const config = withPlugins(
  [
    [
      optimizedImages,
      {
        optimizeImages: false,
      },
    ],
  ],
  {
    env: {
      STAGE: process.env.STAGE
    },
    images: {
      disableStaticImages: true,
    },
    reactStrictMode: true,
  }
)

module.exports = config