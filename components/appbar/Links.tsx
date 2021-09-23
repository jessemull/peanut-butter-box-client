import Link from 'next/link'
import { useContext } from 'react'
import { OAuthContext } from '../../providers/oauth'
import styles from './Links.module.css'

export const links = [{
  href: '/#subscriptions',
  label: 'Subscriptions'
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
  const { isSignedIn, signOut } = useContext(OAuthContext)
  return (
    <nav>
      <ul className={styles.app_bar_links}>
        {links.map(({ href, label }) => (
          <li className={styles.app_bar_link} key={href}>
            <Link href={href}>
              <a >{label}</a>
            </Link>
          </li>
        ))}
        {isSignedIn
          ? <li className={styles.app_bar_link}>
              <button aria-label="Sign Out" className={styles.app_bar_link_sign_out} onClick={signOut}>Sign Out</button>
            </li>
          : <li className={styles.app_bar_link}>
              <Link href="/signin">
                <a >Sign In</a>
              </Link>
            </li>
        }
      </ul>
    </nav>
  )
}

export default Links
