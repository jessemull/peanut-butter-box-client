import { useRouter } from 'next/router'
import SquareButton from '../buttons/Square'
import styles from './About.module.css'

const About = (): JSX.Element => {
  const router = useRouter()

  const subscribe = async () => {
    await router.push('/#subscriptions')
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h4 className={styles.title}>Jars From A Few Nuts!</h4>
        <p className={styles.description}>Emerging from a peanut butter fueled fever dream, Peanut Butter Box is our way of sharing our love of peanut butter with the world!</p>
        <p className={styles.description}>From Monaco to Michigan, our team of experts scours the globe to bring the very best peanut butters straight to your doorstep.</p>
        <p className={styles.description}>So don your top hat and dust off your monocle as you embark on your own salty, sweet peanut butter journey. Click below to subscribe now!</p>
        <div className={styles.subscribe_now}>
          <SquareButton id="about-subscribe-now-button" label="Subscribe Now!" onClick={subscribe} />
        </div>
      </div>
    </div>
  )
}

export default About
