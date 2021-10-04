import Form from './Form'
import signin from '../../public/images/signin.webp'
import styles from './Contact.module.css'

const background = `linear-gradient( rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75) ), url(${signin})`

const Contact = (): JSX.Element => (
  <div className={styles.contact_container} style={{ backgroundImage: background }}>
    <Form />
  </div>
)

export default Contact
