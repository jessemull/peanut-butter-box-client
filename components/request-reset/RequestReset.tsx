import Form from './Form'
import signin from '../../public/images/signin.webp'
import styles from './RequestReset.module.css'

const background = `linear-gradient( rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75) ), url(${signin})`

const RequestResetPage = (): JSX.Element => (
  <div className={styles.request_reset_container} style={{ backgroundImage: background }}>
    <Form />
  </div>
)

export default RequestResetPage
