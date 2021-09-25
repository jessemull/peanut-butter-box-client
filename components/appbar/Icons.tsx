import fuzzysort from 'fuzzysort'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react'
import CartIcon from '../icons/Cart'
import ProfileIcon from '../icons/Profile'
import SearchIcon from '../icons/Search'
import styles from './Icons.module.css'
import { OAuthContext } from '../../providers/oauth'
import { CartContext } from '../../providers/cart'

interface Subscription {
  description: string;
  price: {
    full: {
      monthly: string;
      total: string;
    },
    half: {
      monthly: string;
      total: string;
    }
  };
  productId: string;
  title: string;
}

interface IconsProps {
  subscriptions: Array<Subscription>;
}

const Icons = ({ subscriptions }: IconsProps): JSX.Element => {
  const input = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const { products } = useContext(CartContext)
  const { isSignedIn } = useContext(OAuthContext)
  const [suggestions, setSuggestions] = useState<Array<Subscription>>([])
  const [value, setValue] = useState('')

  useEffect(() => {
    document.addEventListener('mousedown', collapseSearchInput)
    return () => {
      document.removeEventListener('mousedown', collapseSearchInput)
    }
  })

  const reset = () => {
    if (input && input.current) {
      input.current.classList.remove(styles.search_input_expanded)
      setSuggestions([])
      setValue('')
    }
  }

  const collapseSearchInput = (event: MouseEvent) => {
    if (input && input.current && !input.current.contains(event.target as Node)) {
      reset()
    }
  }

  const expandSearchInput = () => {
    if (input && input.current) {
      input.current.classList.toggle(styles.search_input_expanded)
      input.current.focus()
    }
  }

  const onChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const found = suggestions?.find(({ title }) => event.target.value === title)
    if (found) {
      reset()
      await router.push(`/#${found.productId}`)
    } else {
      const suggestions = fuzzysort.go(event.target.value, subscriptions, { keys: ['title', 'description'] })
      setValue(event.target.value)
      setSuggestions(suggestions.map(({ obj }) => obj))
    }
  }

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
