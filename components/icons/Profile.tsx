import PropTypes from 'prop-types'

interface ProfileIconProps {
  color: string;
  size: string | number;
}

const ProfileIcon = ({ color, size }: ProfileIconProps): JSX.Element => (
  <svg height={size} width={size} viewBox="0 0 32 32">
    <g transform="matrix(0.57142857,0,0,0.57118569,-2.2857143,-2.2711413)">
      <path d="m 41.2452,33.0349 a 16,16 0 1 0 -18.49,0 A 26.0412,26.0412 0 0 0 4,58 2,2 0 0 0 6,60 H 58 A 2,2 0 0 0 60,58 26.0412,26.0412 0 0 0 41.2452,33.0349 Z M 20,20 A 12,12 0 1 1 32,32 12.0137,12.0137 0 0 1 20,20 Z M 8.09,56 A 22.0293,22.0293 0 0 1 30,36 h 4 a 22.0293,22.0293 0 0 1 21.91,20 z" fill={color} stroke={color} />
    </g>
  </svg>
)

ProfileIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
}

ProfileIcon.defaultProps = {
  color: '#000000',
  size: 32
}

export default ProfileIcon
