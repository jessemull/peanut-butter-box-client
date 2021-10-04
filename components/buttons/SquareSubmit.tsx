import PropTypes from 'prop-types'
import Progress from '../progress'
import styles from './SquareSubmit.module.css'

interface SubmitButtonProps {
  id: string;
  loading?: boolean;
  value: string;
}

const SubmitButton = ({ id, loading, value }: SubmitButtonProps): JSX.Element => (
  <div className={styles.square_submit_container}>
    <input className={styles.square_submit} disabled={loading} id={id} type="submit" value={loading ? '' : value} />
    {loading && <div className={styles.submit_button_progress}><Progress /></div>}
  </div>
)

SubmitButton.propTypes = {
  id: PropTypes.string,
  loading: PropTypes.bool,
  value: PropTypes.string
}

export default SubmitButton
