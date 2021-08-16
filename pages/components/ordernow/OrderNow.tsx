import background from '../../../public/images/order-now.jpg'
import backgroundMobile from '../../../public/images/order-now-mobile.jpg'

const OrderNow = (): JSX.Element => (
  <>
    <img alt="Peanut Butter Box" className="background-image" src={background} />
    <img alt="Peanut Butter Box" className="background-image-mobile" src={backgroundMobile} />
  </>
)

export default OrderNow
