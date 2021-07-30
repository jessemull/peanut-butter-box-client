import { useEffect } from 'react'
import useAuth from './hooks/oauth'
/* eslint-disable */

export default function Home (): JSX.Element {
  const { signIn, signOut } = useAuth()
  return (
    <div>
      <button onClick={signIn}>Sign in</button>
      <button onClick={signOut}>Sign out</button>
    </div>
  )
}
