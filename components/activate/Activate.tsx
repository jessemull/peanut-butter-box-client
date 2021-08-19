import Form from './Form'
import signin from '../../public/images/signin.webp'
import styles from './Activate.module.css'

const background = `linear-gradient( rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75) ), url(${signin})`

const Activate = (): JSX.Element => (
  <div className={styles.activate_container} style={{ backgroundImage: background }}>
    <Form />
  </div>
)

export default Activate
