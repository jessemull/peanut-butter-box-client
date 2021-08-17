import Link from 'next/link'
import { useContext } from 'react'
import { OAuthContext } from '../../providers/oauth'
import styles from './Links.module.css'

export const links = [{
  href: '#subscriptions',
  label: 'Subscriptions'
}, {
  href: '/subscribe',
  label: 'Subscribe Now'
}, {
  href: '/reviews',
  label: 'Reviews'
}, {
  href: '/contact',
  label: 'Contact'
}, {
  href: '/about',
  label: 'About'
}]

const Links = (): JSX.Element => {
  const { getIdToken, signOut } = useContext(OAuthContext)
  const isSignedIn = Boolean(getIdToken())
  return (
    <>
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
    </>
  )
}

export default Links
