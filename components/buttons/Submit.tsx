import PropTypes from 'prop-types'
import Progress from '../progress'
import styles from './Submit.module.css'

interface SubmitButtonProps {
  id: string;
  loading: boolean;
  value: string;
}

const SubmitButton = ({ id, loading, value }: SubmitButtonProps): JSX.Element => (
  <div className={styles.submit_button_container}>
    <input className={styles.submit_button} id={id} type="submit" value={loading ? '' : value} />
    {loading && <div className={styles.submit_button_progress}><Progress /></div>}
  </div>
)

SubmitButton.propTypes = {
  id: PropTypes.string,
  loading: PropTypes.bool,
  value: PropTypes.string
}
export default SubmitButton
