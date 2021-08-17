import PropTypes from 'prop-types'
import styles from './Reset.module.css'

interface ResetButtonProps {
  id: string;
  label: string;
}

const ResetButton = ({ id, label }: ResetButtonProps): JSX.Element => (
  <button className={styles.reset_button} id={id}>{label}</button>
)

ResetButton.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string
}

export default ResetButton
