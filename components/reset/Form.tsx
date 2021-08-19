import get from 'lodash/get'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import styles from './Form.module.css'
import config from '../../config'
import { SubmitButton } from '../buttons'
import { TextInput } from '../inputs'
import { passwordUtil } from '../../util'

const { usersUrl } = config

const Form = (): JSX.Element => {
  const router = useRouter()
  const [resetToken, setResetToken] = useState('')
  const [resetError, setResetError] = useState('')
  const [password, setPassword] = useState('')
  const [passwordErrors, setPasswordErrors] = useState<Array<string>>([])
  const [passwordVerify, setPasswordVerify] = useState('')
  const [passwordVerifyError, setPasswordVerifyError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setResetToken(get(router.query, 'token', '') as string)
  }, [router.query])

  const onPasswordChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value)
    setResetError('')
  }

  const onPasswordVerifyChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setPasswordVerify(event.target.value)
    setResetError('')
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
        await fetch(`${usersUrl}/reset`, { headers: { 'Content-Type': 'application/json' }, method: 'POST', body: JSON.stringify({ resetToken, password }) })
        setLoading(false)
        await router.push('/resetsuccess')
      } catch (err) {
        setLoading(false)
        setResetError(get(err, 'error', 'Password reset failed!'))
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
    <form className={styles.reset_form} onSubmit={submit}>
      <div className={styles.reset_input}>
        <TextInput
          autocomplete="new-password"
          errors={passwordErrors}
          id="reset-password"
          onChange={onPasswordChange}
          placeholder="Enter password"
          type="password"
          value={password}
        />
      </div>
      <div className={styles.reset_input}>
        <TextInput
          autocomplete="new-password"
          errors={passwordVerifyError}
          id="reset-verify-password"
          onChange={onPasswordVerifyChange}
          placeholder="Re-enter password"
          type="password"
          value={passwordVerify}
        />
      </div>
      <div className={styles.reset_buttons}>
        <div className={styles.reset_form_button}>
          <SubmitButton id="reset-verify-submit" loading={loading} value="Verify" />
          {resetError &&
            <div className={styles.reset_error_container}>
              <div className={styles.reset_error}>{resetError}</div>
            </div>
          }
          <div className={styles.reset}>
            <Link href="/signin">
              <a className={styles.reset_link}>Sign In</a>
            </Link>
            <Link href="/request">
              <a className={styles.reset_link}>Forgot password?</a>
            </Link>
          </div>
        </div>
      </div>
    </form>
  )
}

export default Form
