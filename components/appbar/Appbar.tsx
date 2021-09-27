import fuzzysort from 'fuzzysort'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { ChangeEvent, useRef, useState } from 'react'
import Icons from './Icons'
import Links from './Links'
import MenuIcon from '../icons/Menu'
import MobileSearch from './MobileSearch'
import styles from './AppBar.module.css'

interface Subscription {
  description: string;
  examples: string;
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
  const inputMobile = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const [suggestions, setSuggestions] = useState<Array<Subscription>>([])
  const [value, setValue] = useState('')

  const reset = () => {
    setSuggestions([])
    setValue('')
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
        <MobileSearch input={inputMobile} onChange={onChange} reset={reset} suggestions={suggestions} value={value} />
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
          <Icons input={input} onChange={onChange} reset={reset} suggestions={suggestions} value={value} />
        </div>
      </div>
    </div>
  )
}

Appbar.propTypes = {
  subscriptions: PropTypes.arrayOf(PropTypes.shape({
    description: PropTypes.string,
    examples: PropTypes.string,
    price: PropTypes.shape({
      full: PropTypes.shape({
        monthly: PropTypes.number,
        total: PropTypes.number
      }),
      half: PropTypes.shape({
        monthly: PropTypes.number,
        total: PropTypes.number
      })
    }),
    productId: PropTypes.string,
    title: PropTypes.string
  })),
  toggleOpen: PropTypes.func
}

export default Appbar
