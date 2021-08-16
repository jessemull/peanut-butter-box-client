import Link from 'next/link'
import { RefObject } from 'react'

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
    <nav className="nav" ref={nav}>
      <ul className="menu">
        {links.map(({ href, label }) => (
          <li className="menu-item" key={href}>
            <Link href={href}>
              <a className="menu-item-link">{label}</a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Menu
