import Link from 'next/link'
import { useContext } from 'react'
import { CartContext } from '../../providers/cart'
import { OAuthContext } from '../../providers/oauth'
import { ToastContext } from '../../providers/toast'
import CartIcon from '../icons/Cart'
import ProfileIcon from '../icons/Profile'
import Toast from '../toast'
import styles from './BottomNav.module.css'

const Icons = (): JSX.Element => {
  const { products } = useContext(CartContext)
  const { isSignedIn } = useContext(OAuthContext)
  const { error, message, show } = useContext(ToastContext)
  return (
    <>
    <Toast error={error} message={message} show={show} />
      <div className={styles.bottom_nav}>
        <Link href={isSignedIn ? '/profile' : '/signin'}>
          <a className={styles.icon_container_bottom_nav}>
            <div className={styles.icon_container_bottom_nav_inner}>
              <ProfileIcon size={26} />
              <p className={styles.icon_container_bottom_nav_label}>Profile</p>
            </div>
          </a>
        </Link>
        <Link href="/cart">
          <a className={styles.icon_container_bottom_nav}>
            <div className={styles.icon_container_bottom_nav_inner}>
              <CartIcon numProducts={products.length} size={26} />
              <p className={styles.icon_container_bottom_nav_label}>Cart</p>
            </div>
          </a>
        </Link>
      </div>
    </>
  )
}

export default Icons
