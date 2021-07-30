import { useContext } from 'react'
import { OAuthContext } from './providers/oauth'

export default function Home (): JSX.Element {
  const { signIn, signOut } = useContext(OAuthContext)
  return (
    <div>
      <button onClick={() => signIn()}>Sign in</button>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  )
}
