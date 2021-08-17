import Link from 'next/link'
import CartIcon from '../icons/Cart'
import ProfileIcon from '../icons/Profile'
import SearchIcon from '../icons/Search'
import styles from './Icons.module.css'

const icons = [{
  Icon: SearchIcon,
  label: 'search'
}, {
  Icon: ProfileIcon,
  href: '/signin',
  label: 'profile'
}, {
  Icon: CartIcon,
  href: '/cart',
  label: 'cart'
}]

const Icons = (): JSX.Element => (
  <>
    {icons.map(({ Icon, href, label }) =>
      href
        ? (
            <div className={styles.icon_container} key={label}>
              <Link href={href}>
                <a><Icon /></a>
              </Link>
            </div>
          )
        : (
            <div className={styles.icon_container} key={label}>
              <Icon />
            </div>
          )
    )}
  </>
)

export default Icons
