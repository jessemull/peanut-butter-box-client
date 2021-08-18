const baseUrl = 'https://zesve9r89j.execute-api.us-east-1.amazonaws.com/dev'

const config = {
  healthcheckUrl: `${baseUrl}/healthcheck`,
  redirectUri: 'https://dev.peanutbutterbox.org',
  usersUrl: `${baseUrl}/users`
}

export default config
