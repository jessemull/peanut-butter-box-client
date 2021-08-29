import Link from 'next/link'
import { useContext } from 'react'
import CartIcon from '../icons/Cart'
import ProfileIcon from '../icons/Profile'
import SearchIcon from '../icons/Search'
import styles from './Icons.module.css'
import { OAuthContext } from '../../providers/oauth'
import { CartContext } from '../../providers/cart'

const Icons = (): JSX.Element => {
  const { products } = useContext(CartContext)
  const { getIdToken } = useContext(OAuthContext)
  const isSignedIn = Boolean(getIdToken())

  return (
    <>
      <button aria-label="search" className={styles.icon_container_search}>
        <SearchIcon />
      </button>
      <div className={styles.icon_container}>
        <Link href={isSignedIn ? '/profile' : '/signin'}>
          <a><ProfileIcon /></a>
        </Link>
      </div>
      <div className={styles.icon_container}>
        <Link href="/cart">
          <a><CartIcon numProducts={products.length} /></a>
        </Link>
      </div>
    </>
  )
}

export default Icons
