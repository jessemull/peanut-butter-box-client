import PropTypes from 'prop-types'
import SearchIcon from '../icons/Search'
import styles from './MobileSearch.module.css'

interface MobileSearchProps {
  color: string;
}

const MobileSearch = ({ color }: MobileSearchProps): JSX.Element => (
  <div className={styles.icon_container_mobile}>
    <SearchIcon color={color} size={28} />
  </div>
)

MobileSearch.propTypes = {
  color: PropTypes.string
}

MobileSearch.defaultProps = {
  color: '#FFFFFF'
}

export default MobileSearch
