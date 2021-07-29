module.exports = {
  reactStrictMode: true,
  exportPathMap(defaultPathMap) {
    defaultPathMap['404'] = defaultPathMap['error']
    return { 
      '/': { page: '/' }, 
      '/error': { page: '/404' },
    }
  },
}
