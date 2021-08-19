import EmailValidator from 'email-validator'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ChangeEvent, FormEvent, useContext, useState } from 'react'
import LockIcon from '../icons/Lock'
import UserIcon from '../icons/User'
import styles from './Form.module.css'
import { SubmitButton } from '../buttons'
import { TextInput } from '../inputs'
import { OAuthContext } from '../../providers/oauth'
import { passwordUtil } from '../../util'

export default function SignIn (): JSX.Element {
  const router = useRouter()
  const { signIn } = useContext(OAuthContext)
  const [signInError, setSignInError] = useState(false)
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordErrors, setPasswordErrors] = useState<Array<string>>([])

  const onEmailChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value)
    setSignInError(false)
  }

  const onPasswordChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value)
    setSignInError(false)
  }

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    const isValidPassword = passwordUtil.validator.validate(password, { list: true })
    const isValidEmail = EmailValidator.validate(email)
    if (isValidPassword.length === 0 && isValidEmail) {
      try {
        setLoading(true)
        setEmailError('')
        setPasswordErrors([])
        await signIn({ username: email, password })
        await router.push('/')
        setLoading(false)
      } catch (err) {
        setLoading(false)
        setSignInError(true)
      }
    } else {
      if (isValidPassword.length > 0) {
        setPasswordErrors(passwordUtil.getPasswordErrorMessages(isValidPassword))
      }
      if (!isValidEmail) {
        setEmailError('Please enter a valid e-mail address')
      }
    }
  }

  return (
    <form className={styles.sign_in_form} onSubmit={submit}>
      <div className={styles.email}>
        <TextInput
          errors={emailError}
          Icon={UserIcon}
          id="sign-in-email"
          onChange={onEmailChange}
          placeholder="E-mail"
          type="text"
          value={email}
        />
      </div>
      <div className={styles.password}>
        <TextInput
          errors={passwordErrors}
          Icon={LockIcon}
          id="sign-in-password"
          onChange={onPasswordChange}
          placeholder="Password"
          type="password"
          value={password}
        />
      </div>
      <div className={styles.sign_in_buttons}>
        <div className={styles.sign_in_form_button}>
          <SubmitButton id="sign-in-submit" loading={loading} value="Sign In" />
          {signInError &&
            <div className={styles.sign_in_error_container}>
              <div className={styles.sign_in_error}>Login failed!</div>
              <div className={styles.sign_in_error}>Not a user? Sign up now!</div>
            </div>
          }
          <div className={styles.sign_up}>
            <Link href="/signup">
              <a className={styles.sign_up_link}>Sign Up</a>
            </Link>
            <Link href="/reset">
              <a className={styles.sign_up_link}>Forgot password?</a>
            </Link>
          </div>
        </div>
      </div>
    </form>
  )
}
