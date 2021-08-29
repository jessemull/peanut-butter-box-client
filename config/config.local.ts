const baseUrl = 'https://dev-api.peanutbutterbox.org'

const config = {
  healthcheckUrl: `${baseUrl}/healthcheck`,
  productsUrl: `${baseUrl}/products`,
  redirectUri: 'http://localhost:3000',
  usersUrl: `${baseUrl}/users`
}

export default config
