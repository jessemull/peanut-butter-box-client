import background from '../../public/images/order-now.webp'
import backgroundMobile from '../../public/images/order-now-mobile.webp'
import styles from './OrderNow.module.css'

const OrderNow = (): JSX.Element => (
  <>
    <img alt="Peanut Butter Box" className={styles.background_image} src={background} />
    <img alt="Peanut Butter Box" className={styles.background_image_mobile} src={backgroundMobile} />
  </>
)

export default OrderNow
