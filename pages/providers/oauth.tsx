import { createContext, useEffect } from 'react'
import { OktaAuth } from '@okta/okta-auth-js'

export const OAuthContext = createContext({
  authClient: {},
  getAccessToken: (): string | undefined => '',
  getIdToken: (): string | undefined => '',
  signIn: () => Promise.resolve(),
  signOut: () => Promise.resolve()
})

const config = {
  clientId: '0oa1d73vblRClOdjg5d7',
  issuer: 'https://dev-82492334.okta.com/oauth2/default',
  redirectUri: 'http://localhost:3000',
  scopes: ['openid', 'profile', 'email'],
  pkce: true
}

const authClient = new OktaAuth(config)

interface OAuthProviderProps {
  children: Array<JSX.Element> | JSX.Element
}

const OAuthProvider = ({ children }: OAuthProviderProps): JSX.Element => {
  const signIn = () => authClient.signInWithRedirect()

  const signOut = () => authClient.signOut()

  const getIdToken = () => authClient.getIdToken()

  const getAccessToken = () => authClient.getAccessToken()

  useEffect(() => {
    const setToken = async () => {
      const isAuthorized = authClient.getIdToken()
      if (authClient.isLoginRedirect() && !isAuthorized) {
        const { tokens: { accessToken, idToken } } = await authClient.token.parseFromUrl()
        if (accessToken) {
          authClient.tokenManager.add('accessToken', accessToken)
        }
        if (idToken) {
          authClient.tokenManager.add('idToken', idToken)
        }
      }
    }
    setToken() // eslint-disable-line
  }, [])

  return (
    <OAuthContext.Provider value={{
      authClient,
      getAccessToken,
      getIdToken,
      signIn,
      signOut
    }}>
      {children}
    </OAuthContext.Provider>
  )
}

export default OAuthProvider
