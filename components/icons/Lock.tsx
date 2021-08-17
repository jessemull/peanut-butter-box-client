import PropTypes from 'prop-types'

export interface LockIconProps {
  color: string;
  size: string | number;
}

const LockIcon = ({ color, size }: LockIconProps): JSX.Element => (
  <svg width={size} height={size} viewBox="0 0 32 32">
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g fill={color}>
        <path d="M16,21.9146472 L16,24.5089948 C16,24.7801695 16.2319336,25 16.5,25 C16.7761424,25 17,24.7721195 17,24.5089948 L17,21.9146472 C17.5825962,21.708729 18,21.1531095 18,20.5 C18,19.6715728 17.3284272,19 16.5,19 C15.6715728,19 15,19.6715728 15,20.5 C15,21.1531095 15.4174038,21.708729 16,21.9146472 L16,21.9146472 Z M9,14.0000125 L9,10.499235 C9,6.35670485 12.3578644,3 16.5,3 C20.6337072,3 24,6.35752188 24,10.499235 L24,14.0000125 C25.6591471,14.0047488 27,15.3503174 27,17.0094776 L27,26.9905224 C27,28.6633689 25.6529197,30 23.991212,30 L9.00878799,30 C7.34559019,30 6,28.652611 6,26.9905224 L6,17.0094776 C6,15.339581 7.34233349,14.0047152 9,14.0000125 L9,14.0000125 L9,14.0000125 Z M12,14 L12,10.5008537 C12,8.0092478 14.0147186,6 16.5,6 C18.9802243,6 21,8.01510082 21,10.5008537 L21,14 L12,14 L12,14 L12,14 Z"></path>
      </g>
    </g>
  </svg>
)

LockIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
}

LockIcon.defaultProps = {
  color: '#FFFFFF',
  size: 18
}

export default LockIcon