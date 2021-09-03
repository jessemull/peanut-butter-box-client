import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import Accordion from './Accordion'
import signin from '../../public/images/signin.webp'
import styles from './Profile.module.css'
import { OAuthContext } from '../../providers/oauth'

const background = `linear-gradient( rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75) ), url(${signin})`

const Profile = (): JSX.Element => {
  const router = useRouter()
  const { isSignedIn } = useContext(OAuthContext)

  useEffect(() => {
    const checkSignIn = async () => {
      if (!isSignedIn) {
        await router.push('/signin')
      }
    }
    checkSignIn() // eslint-disable-line
  }, [isSignedIn, router])

  return (
    <div className={styles.profile_container} style={{ backgroundImage: background }}>
      <Accordion />
    </div>
  )
}

export default Profile
