import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import Accordion from './Accordion'
import Toast from '../toast/Toast'
import signin from '../../public/images/signin.webp'
import styles from './Profile.module.css'
import { OAuthContext } from '../../providers/oauth'
import { ToastContext } from '../../providers/toast'

const background = `linear-gradient( rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75) ), url(${signin})`

const Profile = (): JSX.Element => {
  const router = useRouter()
  const { isSignedIn, isSignedInLoaded } = useContext(OAuthContext)
  const { error, message, show } = useContext(ToastContext)

  useEffect(() => {
    const checkSignIn = async () => {
      if (!isSignedIn && isSignedInLoaded) {
        await router.push('/signin')
      }
    }
    checkSignIn() // eslint-disable-line
  }, [isSignedIn, isSignedInLoaded, router])

  return (
    <div className={styles.profile_container} style={{ backgroundImage: background }}>
      <Accordion />
      <Toast error={error} message={message} show={show} />
    </div>
  )
}

export default Profile
