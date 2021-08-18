import Form from './Form'
import signin from '../../public/images/signin.jpg'
import styles from './SignUp.module.css'

const background = `linear-gradient( rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75) ), url(${signin})`

const SignUp = (): JSX.Element => (
  <div className={styles.sign_up_container} style={{ backgroundImage: background }}>
    <Form />
  </div>
)

export default SignUp
