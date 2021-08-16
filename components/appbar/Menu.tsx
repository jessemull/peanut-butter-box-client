import Link from 'next/link'
import { RefObject } from 'react'
import styles from './Menu.module.css'

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
  href: '/signup',
  label: 'Sign Up'
}, {
  href: '/contact',
  label: 'Contact'
}, {
  href: '/about',
  label: 'About'
}]

interface MenuProps {
  nav: RefObject<HTMLHeadingElement>
}

const Menu = ({ nav }: MenuProps): JSX.Element => {
  return (
    <nav className={styles.nav} ref={nav}>
      <ul className={styles.menu}>
        {links.map(({ href, label }) => (
          <li className={styles.menu_item} key={href}>
            <Link href={href}>
              <a className={styles.menu_item_link}>{label}</a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Menu
