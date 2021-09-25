import fuzzysort from 'fuzzysort'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import Icons from './Icons'
import Links from './Links'
import MenuIcon from '../icons/Menu'
import MobileSearch from './MobileSearch'
import styles from './AppBar.module.css'

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

interface AppBarProps {
  subscriptions: Array<Subscription>;
  toggleOpen: () => void
}

const Appbar = ({ subscriptions, toggleOpen }: AppBarProps): JSX.Element => {
  const input = useRef<HTMLInputElement>(null)
  const router = useRouter()
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
    <div>
      <div className={styles.header}>
        <MenuIcon toggleOpen={toggleOpen} />
        <MobileSearch />
      </div>
      <div className={styles.app_bar}>
        <div className={styles.app_bar_links}>
          <Link href="/">
            <a>
              <h1 className={styles.app_bar_title}>Peanut Butter Box</h1>
            </a>
          </Link>
          <Links />
        </div>
        <div className={styles.app_bar_icons}>
          <Icons expandSearchInput={expandSearchInput} input={input} onChange={onChange} suggestions={suggestions} value={value} />
        </div>
      </div>
    </div>
  )
}

export default Appbar
