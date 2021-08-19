import broken from '../../public/images/broken-peanut.webp'
import styles from './ComingSoon.module.css'

const ComingSoon = (): JSX.Element => (
  <div className={styles.coming_soon_container}>
    <div className={styles.coming_soon_header}>Coming Soon</div>
    <img alt="Coming Soon" className={styles.coming_soon_image} src={broken} />
  </div>
)

export default ComingSoon
