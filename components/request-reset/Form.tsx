import EmailValidator from 'email-validator'
import get from 'lodash/get'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ChangeEvent, FormEvent, useState } from 'react'
import config from '../../config'
import styles from './Form.module.css'
import { SubmitButton } from '../buttons'
import { TextInput } from '../inputs'
import { doPost } from '../../util/api'

const { usersUrl } = config

export default function SignIn (): JSX.Element {
  const router = useRouter()
  const [requestError, setRequestError] = useState('')
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [loading, setLoading] = useState(false)

  const onEmailChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value)
    setRequestError('')
  }

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    const isValidEmail = EmailValidator.validate(email)
    if (isValidEmail) {
      try {
        setLoading(true)
        setEmailError('')
        setRequestError('')
        await doPost(`${usersUrl}/request/reset`, JSON.stringify({ email }))
        console.log('Success')
        await router.push('/resetmessage')
        setLoading(false)
      } catch (err) {
        console.log('Error', err)
        setLoading(false)
        setRequestError(get(err, 'error', 'Reset request failed!'))
      }
    } else {
      if (!isValidEmail) {
        setEmailError('Please enter a valid e-mail address')
      }
    }
  }

  return (
    <form className={styles.request_reset_form} onSubmit={submit}>
      <div className={styles.request_reset_title}>Enter your e-mail to reset your password</div>
      <div className={styles.email}>
        <TextInput
          autocomplete="email"
          errors={emailError}
          id="reset-request-email"
          onChange={onEmailChange}
          placeholder="E-mail"
          type="text"
          value={email}
        />
      </div>
      <div className={styles.request_reset_buttons}>
        <div className={styles.request_reset_form_button}>
          <SubmitButton id="request-reset-submit" loading={loading} value="Reset Password" />
          {requestError &&
            <div className={styles.request_reset_error_container}>
              <div className={styles.request_reset_error}>{requestError}</div>
            </div>
          }
          <div className={styles.sign_up_container}>
            <Link href="/signup">
              <a className={styles.sign_up_link}>Sign Up</a>
            </Link>
            <Link href="/signin">
              <a className={styles.sign_up_link}>Back to Sign In</a>
            </Link>
          </div>
        </div>
      </div>
    </form>
  )
}
