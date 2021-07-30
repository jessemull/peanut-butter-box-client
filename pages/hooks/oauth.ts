import { OktaAuth } from '@okta/okta-auth-js'
import { useRouter } from 'next/router'
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

const useAuth = () => {
  const router = useRouter();

  const signIn = () => authClient.signInWithRedirect()

  const signOut = () => authClient.signOut()

  const getToken = () => authClient.getIdToken()

  useEffect(() => {
    const setToken = async () => {
      const isAuthorized = await authClient.getIdToken()
      if (authClient.isLoginRedirect() && !isAuthorized) {
          const { tokens: { idToken } } = await authClient.token.parseFromUrl()
          authClient.tokenManager.add('idToken', idToken)
      }
    }
    setToken()
  }, [])

  return {
    authClient,
    getToken,
    signIn,
    signOut,
  }
}

export default useAuth
