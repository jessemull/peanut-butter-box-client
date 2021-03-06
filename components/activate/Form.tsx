import get from 'lodash/get'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import styles from './Form.module.css'
import config from '../../config'
import { SubmitButton } from '../buttons'
import { TextInput } from '../inputs'
import { passwordUtil } from '../../util'
import { doPost } from '../../util/api'

const { usersUrl } = config

const Form = (): JSX.Element => {
  const router = useRouter()
  const [activationToken, setActivationToken] = useState('')
  const [verifyError, setVerifyError] = useState('')
  const [password, setPassword] = useState('')
  const [passwordErrors, setPasswordErrors] = useState<Array<string>>([])
  const [passwordVerify, setPasswordVerify] = useState('')
  const [passwordVerifyError, setPasswordVerifyError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setActivationToken(get(router.query, 'token', '') as string)
  }, [router.query])

  const onPasswordChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value)
    setVerifyError('')
  }

  const onPasswordVerifyChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setPasswordVerify(event.target.value)
    setVerifyError('')
  }

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    const isValidPassword = passwordUtil.validator.validate(password, { list: true })
    const isValidVerifyPassword = password === passwordVerify
    if (isValidPassword.length === 0 && isValidVerifyPassword) {
      try {
        setLoading(true)
        setPasswordErrors([])
        setPasswordVerifyError('')
        await doPost(`${usersUrl}/verify`, JSON.stringify({ activationToken, password }))
        setLoading(false)
        await router.push('/welcome')
      } catch (err) {
        setLoading(false)
        setVerifyError(get(err, 'error', 'Verification failed!'))
      }
    } else {
      if (isValidPassword.length > 0) {
        setPasswordErrors(passwordUtil.getPasswordErrorMessages(isValidPassword))
      }
      if (!isValidVerifyPassword) {
        setPasswordVerifyError('Passwords do not match')
      }
    }
  }

  return (
    <form className={styles.activate_form} onSubmit={submit}>
      <div className={styles.activate_input}>
        <TextInput
          autocomplete="new-password"
          errors={passwordErrors}
          id="activate-password"
          onChange={onPasswordChange}
          placeholder="Enter password"
          type="password"
          value={password}
        />
      </div>
      <div className={styles.activate_input}>
        <TextInput
          autocomplete="new-password"
          errors={passwordVerifyError}
          id="activate-verify-password"
          onChange={onPasswordVerifyChange}
          placeholder="Re-enter password"
          type="password"
          value={passwordVerify}
        />
      </div>
      <div className={styles.activate_buttons}>
        <div className={styles.activate_form_button}>
          <SubmitButton id="activate-verify-submit" loading={loading} value="Verify" />
          {verifyError &&
            <div className={styles.activate_error_container}>
              <div className={styles.activate_error}>{verifyError}</div>
            </div>
          }
          <div className={styles.activate}>
            <Link href="/signin">
              <a className={styles.activate_link}>Sign In</a>
            </Link>
            <Link href="/request">
              <a className={styles.activate_link}>Forgot password?</a>
            </Link>
          </div>
        </div>
      </div>
    </form>
  )
}

export default Form
