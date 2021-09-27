import PropTypes from 'prop-types'
import { ChangeEvent, RefObject, useEffect, useState } from 'react'
import SearchIcon from '../icons/Search'
import styles from './MobileSearch.module.css'

interface Suggestion {
  title: string;
}

interface MobileSearchProps {
  color: string;
  input: RefObject<HTMLInputElement>;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  reset: () => void;
  suggestions: Array<Suggestion>;
  value: string;
}

const MobileSearch = ({ color, input, onChange, reset, suggestions, value }: MobileSearchProps): JSX.Element => {
  const [isExpanded, setIsExpanded] = useState(false)

  const collapseSearchInputMobile = (event: MouseEvent) => {
    if (isExpanded && input && input.current && !input.current.contains(event.target as Node)) {
      if (input && input.current) {
        input.current.classList.remove(styles.search_input_expanded_mobile)
      }
      reset()
      setIsExpanded(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', collapseSearchInputMobile)
    return () => {
      document.removeEventListener('mousedown', collapseSearchInputMobile)
    }
  })

  const expandSearchInput = () => {
    setIsExpanded(true)
    if (input && input.current) {
      input.current.classList.toggle(styles.search_input_expanded_mobile)
      input.current.focus()
    }
  }

  return (
    <div className={styles.search_input_mobile} ref={input}>
      <button aria-label="search" onClick={expandSearchInput}>
        <SearchIcon color={color} />
      </button>
      <input list="search-input-list" onChange={onChange} value={value} />
      <datalist id="search-input-list">
        {suggestions.map((suggestion) => <option key={suggestion.title}>{suggestion.title}</option>)}
      </datalist>
    </div>
  )
}

MobileSearch.propTypes = {
  color: PropTypes.string
}

MobileSearch.defaultProps = {
  color: '#FFFFFF',
  input: PropTypes.shape({}),
  onChange: PropTypes.func,
  reset: PropTypes.func,
  suggestions: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string
  })),
  value: PropTypes.string
}

export default MobileSearch
