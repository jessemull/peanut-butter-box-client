const baseUrl = 'https://zesve9r89j.execute-api.us-east-1.amazonaws.com/dev'

const config = {
  healthcheckUrl: `${baseUrl}/healthcheck`,
  redirectUri: 'http://dev.peanutbutterbox.org.s3-website-us-east-1.amazonaws.com',
  usersUrl: `${baseUrl}/users`
}

export default config
