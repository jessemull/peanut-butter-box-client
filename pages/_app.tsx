import { useRef, useEffect } from 'react'
import { AppProps } from 'next/app'
import BottomNav from '../components/bottom-nav'
import OAuthProvider from '../providers/oauth'
import Menu from '../components/top-nav/Menu'
import TopNav from '../components/top-nav'
import styles from '../styles/app.module.css'
import '../styles/globals.css'

function MyApp ({ Component, pageProps }: AppProps): JSX.Element {
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
      <TopNav nav={nav} toggleOpen={toggleOpen} />
      <div className={styles.app_container}>
        <Component {...pageProps} />
      </div>
      <BottomNav />
      <Menu nav={nav} />
    </OAuthProvider>
  )
}

export default MyApp
