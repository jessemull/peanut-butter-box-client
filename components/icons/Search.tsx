import PropTypes from 'prop-types'

interface SearchIconProps {
  color: string;
  size: string | number;
}

const SearchIcon = ({ color, size }: SearchIconProps): JSX.Element => (
  <svg height={size} width={size} viewBox="0 0 32 32">
    <g transform="translate(-48.45,-48.45)">
      <path d="m 60.902114,73.354228 c 3.037101,0 5.798102,-1.076791 7.951682,-2.899051 l 9.663503,9.663503 c 0.22088,0.22088 0.496981,0.33132 0.800691,0.33132 0.30371,0 0.57981,-0.11044 0.80069,-0.33132 0.44176,-0.44176 0.44176,-1.15962 0,-1.601381 l -9.663503,-9.663503 c 1.79465,-2.15358 2.899051,-4.942191 2.899051,-7.951682 C 73.354228,54.027222 67.777006,48.45 60.902114,48.45 54.054832,48.45 48.45,54.054832 48.45,60.902114 c 0,6.874892 5.604832,12.452114 12.452114,12.452114 z m 0,-22.640207 c 5.632442,0 10.188093,4.583261 10.188093,10.188093 0,5.632442 -4.555651,10.188093 -10.188093,10.188093 -5.632442,0 -10.188093,-4.583261 -10.188093,-10.188093 0,-5.604832 4.583261,-10.188093 10.188093,-10.188093 z" fill={color} stroke={color} />
    </g>
  </svg>
)

SearchIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
}

SearchIcon.defaultProps = {
  color: '#000000',
  size: 32
}

export default SearchIcon
