import { useRouter } from 'next/router'
import { FormEvent, useContext, useState } from 'react'
import { OAuthContext } from '../providers/oauth'

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
    <form onSubmit={submit}>
      {error}
      <div className="form-element">
        <label>Username:</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={event => setUsername(event.target.value)}
        />
      </div>
      <div className="form-element">
        <label>Password:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
      </div>
      <input id="submit" type="submit" value="Submit" />
    </form>
  )
}
