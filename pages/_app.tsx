import { AppProps } from 'next/app'
import OAuthProvider from './providers/oauth'
import '../styles/globals.css'

function MyApp ({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <OAuthProvider>
      <Component {...pageProps} />
    </OAuthProvider>
  )
}

export default MyApp
