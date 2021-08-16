import PropTypes from 'prop-types'

interface MenuIconProps {
  toggleOpen: () => void,
}

const MenuIcon = ({ toggleOpen }: MenuIconProps): JSX.Element => (
  <button className="menu-icon" onClick={toggleOpen}>
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="#FFFFFF"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-menu"
    >
      <line x1="3" y1="12" x2="21" y2="12"></line>
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
  </button>
)

MenuIcon.propTypes = {
  toggleOpen: PropTypes.func
}

export default MenuIcon
