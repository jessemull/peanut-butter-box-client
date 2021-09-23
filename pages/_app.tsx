import config from '../config'
import { useRef, useEffect } from 'react'
import App, { AppContext, AppInitialProps, AppProps } from 'next/app'
import BottomNav from '../components/bottom-nav'
import OAuthProvider from '../providers/oauth'
import Menu from '../components/top-nav/Menu'
import TopNav from '../components/top-nav'
import styles from '../styles/app.module.css'
import '../styles/globals.css'
import CartProvider from '../providers/cart'
import ToastProvider from '../providers/toast'
import { api } from '../util'

const { productsUrl } = config

interface Subscription {
  description: string;
  price: {
    full: {
      monthly: string;
      total: string;
    },
    half: {
      monthly: string;
      total: string;
    }
  };
  productId: string;
  title: string;
}

interface Subscriptions {
  subscriptions: Array<Subscription>;
}

type MyAppProps = Subscriptions & AppProps

type GetInitialProps = Subscriptions & AppInitialProps

function MyApp ({ Component, pageProps, subscriptions }: MyAppProps): JSX.Element {
  const nav = useRef<HTMLHeadingElement>(null)
  const closeMenu = (): void => {
    if (nav && nav.current) {
      nav.current.classList.remove(styles.nav_open)
    }
  }
  const toggleOpen = (): void => {
    if (nav && nav.current) {
      nav.current.classList.toggle(styles.nav_open)
    }
  }
  useEffect(() => {
    window.addEventListener('resize', closeMenu)
  }, [])
  return (
    <OAuthProvider>
      <CartProvider>
        <ToastProvider>
          <TopNav subscriptions={subscriptions} toggleOpen={toggleOpen} />
          <div className={styles.app_container}>
            <Component {...pageProps} />
          </div>
          <BottomNav />
          <Menu nav={nav} toggleOpen={toggleOpen} />
        </ToastProvider>
      </CartProvider>
    </OAuthProvider>
  )
}

MyApp.getInitialProps = async (appContext: AppContext): Promise<GetInitialProps> => {
  const appProps = await App.getInitialProps(appContext)
  const data = await api.doGet<Array<Subscription>>(productsUrl) || []
  const subscriptions = data.reverse()
  return { ...appProps, subscriptions }
}

export default MyApp
