import { useRouter } from 'next/router'
import { useContext } from 'react'
import { OAuthContext } from './providers/oauth'

export default function Home (): JSX.Element {
  const router = useRouter()
  const { signOut } = useContext(OAuthContext)
  return (
    <div>
      <button onClick={() => router.push('/signin')}>Sign in</button>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  )
}
