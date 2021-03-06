import EmailValidator from 'email-validator'
import get from 'lodash/get'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ChangeEvent, FormEvent, useState } from 'react'
import styles from './Form.module.css'
import config from '../../config'
import { SubmitButton } from '../buttons'
import { TextInput } from '../inputs'
import { doPost } from '../../util/api'

const { usersUrl } = config

const Form = (): JSX.Element => {
  const router = useRouter()
  const [signUpError, setSignUpError] = useState('')
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [firstName, setFirstName] = useState('')
  const [firstNameError, setFirstNameError] = useState('')
  const [lastName, setLastName] = useState('')
  const [lastNameError, setLastNameError] = useState('')
  const [loading, setLoading] = useState(false)

  const onEmailChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value)
    setSignUpError('')
  }

  const onFirstNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setFirstName(event.target.value)
    setSignUpError('')
  }

  const onLastNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLastName(event.target.value)
    setSignUpError('')
  }

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    const isValidEmail = EmailValidator.validate(email)
    if (isValidEmail && firstName && lastName) {
      try {
        setLoading(true)
        setEmailError('')
        await doPost(usersUrl, JSON.stringify({ email, firstName, lastName }))
        setLoading(false)
        await router.push('/emailmessage')
      } catch (err) {
        setLoading(false)
        setSignUpError(get(err, 'error', 'Sign up failed!'))
      }
    } else {
      if (!isValidEmail) {
        setEmailError('Please enter a valid e-mail address')
      }
      if (!firstName) {
        setFirstNameError('Please enter a first name')
      }
      if (!lastName) {
        setLastNameError('Please enter a last name')
      }
    }
  }

  return (
    <form className={styles.sign_up_form} onSubmit={submit}>
      <div className={styles.sign_up_input}>
        <TextInput
          autocomplete="given-name"
          errors={firstNameError}
          id="sign-up-first-name"
          onChange={onFirstNameChange}
          placeholder="First Name"
          type="text"
          value={firstName}
        />
      </div>
      <div className={styles.sign_up_input}>
        <TextInput
          autocomplete="family-name"
          errors={lastNameError}
          id="sign-up-last-name"
          onChange={onLastNameChange}
          placeholder="Last Name"
          type="text"
          value={lastName}
        />
      </div>
      <div className={styles.email}>
        <TextInput
          autocomplete="email"
          errors={emailError}
          id="sign-up-email"
          onChange={onEmailChange}
          placeholder="E-mail"
          type="text"
          value={email}
        />
      </div>
      <div className={styles.sign_up_buttons}>
        <div className={styles.sign_up_form_button}>
          <SubmitButton id="sign-up-submit" loading={loading} value="Sign Up" />
          {signUpError &&
            <div className={styles.sign_up_error_container}>
              <div className={styles.sign_up_error}>{signUpError}</div>
            </div>
          }
          <div className={styles.sign_up}>
            <Link href="/signin">
              <a className={styles.sign_up_link}>Sign In</a>
            </Link>
            <Link href="/request">
              <a className={styles.sign_up_link}>Forgot Password?</a>
            </Link>
          </div>
        </div>
      </div>
    </form>
  )
}

export default Form
