const baseUrl = 'https://zesve9r89j.execute-api.us-east-1.amazonaws.com/prod'

const config = {
  healthcheckUrl: `${baseUrl}/healthcheck`,
  redirectUri: 'https://peanutbutterbox.org',
  usersUrl: `${baseUrl}/users`
}

export default config
