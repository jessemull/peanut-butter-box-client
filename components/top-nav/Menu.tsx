import Link from 'next/link'
import PropTypes from 'prop-types'
import { RefObject } from 'react'
import styles from './Menu.module.css'

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
}, {
  href: '/signin',
  label: 'Sign In'
}]

interface MenuProps {
  nav: RefObject<HTMLHeadingElement>,
  toggleOpen: () => void
}

const Menu = ({ nav, toggleOpen }: MenuProps): JSX.Element => {
  return (
    <nav className={styles.nav} ref={nav}>
      <ul className={styles.menu}>
        {links.map(({ href, label }) => (
          <Link href={href} key={href} passHref>
            <li className={styles.menu_item} onClick={toggleOpen}>
              <a className={styles.menu_item_link}>{label}</a>
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  )
}

Menu.propTypes = {
  nav: PropTypes.object,
  toggleOpen: PropTypes.func
}

export default Menu
