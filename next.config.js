module.exports = {
  reactStrictMode: true,
  exportPathMap(defaultPathMap) {
    return { 
      '/': { page: '/' }, 
      '/error': { page: '/404' },
    }
  },
}
