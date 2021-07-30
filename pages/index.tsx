import { OktaAuth } from '@okta/okta-auth-js'
import { useEffect } from 'react'
/* eslint-disable */
const config = {
  clientId: '0oa1d73vblRClOdjg5d7',
  issuer: 'https://dev-82492334.okta.com/oauth2/default',
  redirectUri: 'http://localhost:3000',
  scopes: ['openid', 'profile', 'email'],
  pkce: true
}

const authClient = new OktaAuth(config)

export default function Home (): JSX.Element {
  useEffect(() => {
    if (authClient.isLoginRedirect()) {
      // Parse token from redirect url
      authClient.token.parseFromUrl()
        .then(data => {
          const { idToken } = data.tokens
          console.log(`Hi ${idToken.claims.email}!`)
          // Store parsed token in Token Manager
          authClient.tokenManager.add('idToken', idToken)
          console.log(idToken)
        })
    } else {
      // Attempt to retrieve ID Token from Token Manager
      authClient.tokenManager.get('idToken')
        .then(idToken => {
          console.log(idToken)
          if (idToken) {
            console.log(`Hi ${idToken.claims.email}!`)
          }
        })
    }
  }, [])
  return (
    <div>
      <div onClick={() => authClient.signInWithRedirect()}>Sign in</div>
      <div onClick={() => authClient.signOut()}>Sign out</div>
    </div>
  )
}
