import PropTypes from 'prop-types'
import styles from './Submit.module.css'

interface SubmitButtonProps {
  id: string;
  value: string;
}

const SubmitButton = ({ id, value }: SubmitButtonProps): JSX.Element => (
  <input className={styles.submit_button} id={id} type="submit" value={value} />
)

SubmitButton.propTypes = {
  id: PropTypes.string,
  value: PropTypes.string
}
export default SubmitButton
