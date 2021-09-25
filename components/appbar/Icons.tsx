import Link from 'next/link'
import { ChangeEvent, RefObject, useContext } from 'react'
import CartIcon from '../icons/Cart'
import ProfileIcon from '../icons/Profile'
import SearchIcon from '../icons/Search'
import styles from './AppBar.module.css'
import { OAuthContext } from '../../providers/oauth'
import { CartContext } from '../../providers/cart'

interface Suggestion {
  title: string;
}

interface IconsProps {
  expandSearchInput: () => void;
  input: RefObject<HTMLInputElement>;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  suggestions: Array<Suggestion>;
  value: string;
}

const Icons = ({ expandSearchInput, input, onChange, suggestions, value }: IconsProps): JSX.Element => {
  const { products } = useContext(CartContext)
  const { isSignedIn } = useContext(OAuthContext)
  return (
    <>
      <div className={styles.search_input} ref={input}>
        <button aria-label="search" className={styles.search_button} onClick={expandSearchInput}>
          <SearchIcon />
        </button>
        <input className={styles.input} list="search-input-list" onChange={onChange} value={value} />
        <datalist id="search-input-list">
          {suggestions.map((suggestion) => <option key={suggestion.title}>{suggestion.title}</option>)}
        </datalist>
      </div>
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
