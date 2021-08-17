import Link from 'next/link'
import { useContext } from 'react'
import { OAuthContext } from '../../providers/oauth'
import CartIcon from '../icons/Cart'
import ProfileIcon from '../icons/Profile'
import SearchIcon from '../icons/Search'
import styles from './Icons.module.css'

const icons = (isSignedIn: boolean) => [{
  Icon: SearchIcon,
  label: 'search'
}, {
  Icon: ProfileIcon,
  href: isSignedIn ? '/profile' : '/signin',
  label: 'profile'
}, {
  Icon: CartIcon,
  href: '/cart',
  label: 'cart'
}]

const Icons = (): JSX.Element => {
  const { getIdToken } = useContext(OAuthContext)
  const isSignedIn = Boolean(getIdToken())
  return (
    <>
      {icons(isSignedIn).map(({ Icon, href, label }) =>
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
}

export default Icons
