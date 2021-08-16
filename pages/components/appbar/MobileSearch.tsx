import PropTypes from 'prop-types'
import SearchIcon from '../icons/Search'

interface MobileSearchProps {
  color: string;
}

const MobileSearch = ({ color }: MobileSearchProps): JSX.Element => (
  <div className="icon-container-mobile">
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
