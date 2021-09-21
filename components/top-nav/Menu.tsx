import Link from 'next/link'
import { RefObject, useContext } from 'react'
import { OAuthContext } from '../../providers/oauth'
import PropTypes from 'prop-types'
import styles from './Menu.module.css'

export const links = [{
  href: '/#subscriptions',
  label: 'Subscriptions'
}, {
  href: '/profile',
  label: 'Profile'
}, {
  href: '/cart',
  label: 'Cart'
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

interface MenuProps {
  nav: RefObject<HTMLHeadingElement>,
  toggleOpen: () => void
}

const Menu = ({ nav, toggleOpen }: MenuProps): JSX.Element => {
  const { isSignedIn, signOut } = useContext(OAuthContext)
  return (
    <nav className={styles.nav} ref={nav}>
      <ul className={styles.menu}>
        {links.map(({ href, label }) => (
          <li className={styles.menu_item} key={href} onClick={toggleOpen} tabIndex={-1}>
            <Link href={href}>
              <a className={styles.menu_item_link}>{label}</a>
            </Link>
          </li>
        ))}
        {isSignedIn
          ? <li className={styles.menu_item} onClick={toggleOpen} tabIndex={-1}>
              <button aria-label="Sign Out" className={styles.menu_item_sign_out} onClick={signOut}>Sign Out</button>
            </li>
          : <li className={styles.menu_item} onClick={toggleOpen} tabIndex={-1}>
              <Link href="/signin">
                <a className={styles.menu_item_link}>Sign In</a>
              </Link>
            </li>
        }
      </ul>
    </nav>
  )
}

Menu.propTypes = {
  nav: PropTypes.object,
  toggleOpen: PropTypes.func
}

export default Menu
