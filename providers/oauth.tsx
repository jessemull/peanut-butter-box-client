import { createContext, useEffect, useState } from 'react'
import { OktaAuth } from '@okta/okta-auth-js'
import config from '../config'

const { redirectUri } = config

interface OAuthProviderProps {
  children: Array<JSX.Element> | JSX.Element
}

interface SignInInput {
  username: string;
  password: string;
}

const oktaConfig = {
  clientId: '0oa1d73vblRClOdjg5d7',
  issuer: 'https://dev-82492334.okta.com/oauth2/default',
  redirectUri,
  postLogoutRedirectUri: redirectUri,
  scopes: ['openid', 'profile', 'email'],
  pkce: true
}

export const OAuthContext = createContext({
  authClient: new OktaAuth(oktaConfig),
  getAccessToken: (): string | undefined => '',
  getIdToken: (): string | undefined => '',
  isSignedIn: false,
  signIn: (credentials: SignInInput) => Promise.resolve(), // eslint-disable-line
  signOut: () => Promise.resolve()
})

const authClient: OktaAuth = new OktaAuth(oktaConfig)

const OAuthProvider = ({ children }: OAuthProviderProps): JSX.Element => {
  const [isSignedIn, setIsSignedIn] = useState(false)

  useEffect(() => {
    const interval = setInterval(async () => {
      const signedIn = await authClient.isAuthenticated()
      if (signedIn !== isSignedIn) {
        setIsSignedIn(signedIn)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [isSignedIn])

  const signIn = async ({ username, password }: SignInInput) => {
    const session = await authClient
      .signInWithCredentials({
        username,
        password
      })
    const tokens = await authClient.token.getWithoutPrompt({
      responseType: ['id_token', 'access_token'],
      scopes: ['openid', 'profile', 'email'],
      sessionToken: session.sessionToken,
      redirectUri
    })
    const { tokens: { accessToken, idToken } } = tokens
    if (accessToken) {
      authClient.tokenManager.add('accessToken', accessToken)
    }
    if (idToken) {
      authClient.tokenManager.add('idToken', idToken)
    }
  }

  const signOut = () => authClient.signOut()

  const getIdToken = () => authClient.getIdToken()

  const getAccessToken = () => authClient.getAccessToken()

  return (
    <OAuthContext.Provider value={{
      authClient,
      getAccessToken,
      getIdToken,
      isSignedIn,
      signIn,
      signOut
    }}>
      {children}
    </OAuthContext.Provider>
  )
}

export default OAuthProvider
