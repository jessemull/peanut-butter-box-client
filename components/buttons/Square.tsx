import PropTypes from 'prop-types'
import styles from './Square.module.css'

interface SquareButtonProps {
  id: string;
  label: string;
  onClick: () => void
}

const SquareButton = ({ id, label, onClick }: SquareButtonProps): JSX.Element => (
  <button className={styles.square_button} id={id} onClick={onClick}>{label}</button>
)

SquareButton.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func
}

export default SquareButton
