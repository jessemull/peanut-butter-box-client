import Link from 'next/link'
import { useContext } from 'react'
import { OAuthContext } from '../../providers/oauth'
import CartIcon from '../icons/Cart'
import ProfileIcon from '../icons/Profile'
import styles from './BottomNav.module.css'

const icons = (isSignedIn: boolean) => [{
  Icon: ProfileIcon,
  href: isSignedIn ? '/profile' : '/signin',
  label: 'Profile'
}, {
  Icon: CartIcon,
  href: '/cart',
  label: 'Cart'
}]

const Icons = (): JSX.Element => {
  const { getIdToken } = useContext(OAuthContext)
  const isSignedIn = Boolean(getIdToken())
  return (
    <div className={styles.bottom_nav}>
      {icons(isSignedIn).map(({ Icon, href, label }) => (
        <Link href={href} key={label} passHref>
          <div className={styles.icon_container_bottom_nav}>
            <div className={styles.icon_container_bottom_nav_inner}>
              <Icon size={26} />
              <p className={styles.icon_container_bottom_nav_label}>{label}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Icons
