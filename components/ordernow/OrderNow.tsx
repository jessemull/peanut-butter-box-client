import background from '../../public/images/order-now.webp'
import backgroundMobile from '../../public/images/order-now-mobile.webp'
import styles from './OrderNow.module.css'

const OrderNow = (): JSX.Element => (
  <>
    <div className={styles.background_image} style={{ backgroundImage: `url(${background})` }}>
      <div className={styles.order_now}>
        <div className={styles.order_now_header_container}>
          <h2 className={styles.order_now_header}>Peanut Butter</h2>
          <h2 className={styles.order_now_header}>Subscriptions</h2>
          <h3 className={styles.order_now_subheader}>Enjoy a new jar every month!</h3>
        </div>
      </div>
    </div>
    <div className={styles.background_image_mobile}>
      <div className={styles.background_image_mobile_image} style={{ backgroundImage: `url(${backgroundMobile})` }} />
      <div className={styles.order_now_mobile}>
        <h2 className={styles.order_now_mobile_header}>Peanut Butter Subscriptions</h2>
        <h3 className={styles.order_now_mobile_subheader}>Enjoy a new jar every month!</h3>
      </div>
    </div>
  </>
)

export default OrderNow
