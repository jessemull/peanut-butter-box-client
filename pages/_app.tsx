import { AppProps } from 'next/app'
import OAuthProvider from './providers/oauth'
import '../styles/globals.css'
import '../styles/home.css'
import '../styles/comingsoon.css'

function MyApp ({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <OAuthProvider>
      <Component {...pageProps} />
    </OAuthProvider>
  )
}

export default MyApp
