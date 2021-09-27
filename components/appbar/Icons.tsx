import Link from 'next/link'
import PropTypes from 'prop-types'
import { ChangeEvent, RefObject, useContext, useEffect, useState } from 'react'
import CartIcon from '../icons/Cart'
import ProfileIcon from '../icons/Profile'
import SearchIcon from '../icons/Search'
import styles from './Icons.module.css'
import { OAuthContext } from '../../providers/oauth'
import { CartContext } from '../../providers/cart'

interface Suggestion {
  title: string;
}

interface IconsProps {
  input: RefObject<HTMLInputElement>;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  reset: () => void;
  suggestions: Array<Suggestion>;
  value: string;
}

const Icons = ({ input, onChange, reset, suggestions, value }: IconsProps): JSX.Element => {
  const { products } = useContext(CartContext)
  const { isSignedIn } = useContext(OAuthContext)
  const [isExpanded, setIsExpanded] = useState(false)

  const collapseSearchInput = (event: MouseEvent) => {
    if (isExpanded && input && input.current && !input.current.contains(event.target as Node)) {
      if (input && input.current) {
        input.current.classList.remove(styles.search_input_expanded)
      }
      reset()
      setIsExpanded(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', collapseSearchInput)
    return () => {
      document.removeEventListener('mousedown', collapseSearchInput)
    }
  })

  const expandSearchInput = () => {
    setIsExpanded(true)
    if (input && input.current) {
      input.current.classList.toggle(styles.search_input_expanded)
      input.current.focus()
    }
  }

  return (
    <>
      <div className={styles.search_input} ref={input}>
        <button aria-label="search" onClick={expandSearchInput}>
          <SearchIcon />
        </button>
        <input list="search-input-list" onChange={onChange} value={value} />
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

Icons.propTypes = {
  input: PropTypes.shape({}),
  onChange: PropTypes.func,
  reset: PropTypes.func,
  suggestions: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string
  })),
  value: PropTypes.string
}

export default Icons
