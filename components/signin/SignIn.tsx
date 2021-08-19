import Form from './Form'
import signin from '../../public/images/signin.webp'
import styles from './SignIn.module.css'

const background = `linear-gradient( rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75) ), url(${signin})`

const SignIn = (): JSX.Element => (
  <div className={styles.sign_in_container} style={{ backgroundImage: background }}>
    <Form />
  </div>
)

export default SignIn
