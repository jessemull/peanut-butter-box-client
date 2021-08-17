import { useRouter } from 'next/router'
import { FormEvent, useContext, useState } from 'react'
import { ResetButton, SubmitButton } from '../buttons'
import { TextInput } from '../inputs'
import { OAuthContext } from '../../providers/oauth'
import styles from './Form.module.css'

export default function SignIn (): JSX.Element {
  const router = useRouter()
  const { signIn } = useContext(OAuthContext)
  const [error, setError] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    try {
      await signIn({ username, password })
      await router.push('/')
    } catch (err) {
      setError(err)
    }
  }

  return (
    <div className={styles.sign_in_form_container}>
      <form onSubmit={submit}>
        {error}
        <TextInput
          id="sign-in-username"
          label="Username"
          onChange={event => setUsername(event.target.value)}
          type="text"
          value={username}
        />
        <TextInput
          id="sign-in-password"
          label="Password"
          onChange={event => setPassword(event.target.value)}
          type="password"
          value={password}
        />
        <div className={styles.sign_in_buttons}>
          <div className={styles.sign_in_form_button}>
            <ResetButton id="sign-in-reset" label="Reset" />
          </div>
        <div className={styles.sign_in_form_button}>
          <SubmitButton id="sign-in-submit" value="Sign In" />
        </div>
        </div>
      </form>
    </div>
  )
}
