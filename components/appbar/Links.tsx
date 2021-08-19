import Link from 'next/link'
import { useContext } from 'react'
import { OAuthContext } from '../../providers/oauth'
import styles from './Links.module.css'

export const links = [{
  href: '#subscriptions',
  label: 'Subscriptions'
}, {
  href: '/reviews',
  label: 'Reviews'
}, {
  href: '/contact',
  label: 'Contact'
}, {
  href: '/about',
  label: 'About'
}, {
  href: '/signup',
  label: 'Sign Up'
}]

const Links = (): JSX.Element => {
  const { getIdToken, signOut } = useContext(OAuthContext)
  const isSignedIn = Boolean(getIdToken())
  return (
    <div className={styles.app_bar_links}>
      {links.map(({ href, label }) => (
        <Link href={href} key={href}>
          <a className={styles.app_bar_link}>{label}</a>
        </Link>
      ))}
      {isSignedIn
        ? <button className={styles.app_bar_link_sign_out} onClick={signOut}>Sign Out</button>
        : <Link href="/signin">
            <a className={styles.app_bar_link}>Sign In</a>
          </Link>
      }
    </div>
  )
}

export default Links
