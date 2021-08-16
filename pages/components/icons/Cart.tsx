import PropTypes from 'prop-types'

interface CartIconProps {
  color: string;
  size: number | string;
}

const CartIcon = ({ color, size }: CartIconProps): JSX.Element => (
  <div style={{ width: size, height: size }}>
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
    </svg>
  </div>
)

CartIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
}

CartIcon.defaultProps = {
  color: '#000000',
  size: 32
}

export default CartIcon
