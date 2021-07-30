import { OktaAuth } from '@okta/okta-auth-js'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

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

  const signIn = () => {
    authClient.token.getWithRedirect({
      responseType: 'id_token'
    })
  }

  const signOut = async () => {
    await authClient.signOut()
  }

  // useEffect(() => {
  //   const storeToken = async () => {
  //     const token = await authClient.tokenManager.get('idToken');
  //     if (authClient.isLoginRedirect() && !token) {
  //       console.log('wontons')
  //       const { tokens: { idToken } } = await authClient.token.parseFromUrl()
  //       authClient.tokenManager.add('idToken', idToken)
  //     }
  //   }
  //   storeToken();
  // }, [router.query]);

  return {
    signIn,
    signOut,
  }
}

export default useAuth
