import PropTypes from 'prop-types'
import { useContext } from 'react'
import SquareButton from '../buttons/Square'
import styles from './Subscriptions.module.css'
import { CartContext } from '../../providers/cart'

interface Subscription {
  description: string;
  examples: string;
  price: {
    full: {
      monthly: string;
      total: string;
    },
    half: {
      monthly: string;
      total: string;
    }
  };
  productId: string;
  title: string;
}

interface SubscriptionsProps {
  subscriptions: Array<Subscription>;
}

const Subscriptions = ({ subscriptions }: SubscriptionsProps): JSX.Element => {
  const { addProduct } = useContext(CartContext)
  return (
    <div className={styles.subscriptions} id="subscriptions">
      {
        subscriptions.map(subscription => (
          <div className={styles.product} id={subscription.productId} key={subscription.productId}>
            <h4 className={styles.title}>{subscription.title}</h4>
            <p className={styles.description}>{subscription.description}</p>
            <p className={styles.examples}>{subscription.examples}</p>
            <div className={styles.all_prices}>
              <div className={styles.prices_container}>
                <div className={styles.prices}>
                  <h5 className={styles.price_header}>One Year</h5>
                  <p className={styles.price_subheader}>${subscription.price.full.total} / YEAR</p>
                  <p className={styles.price_subheader}>${subscription.price.full.monthly} / MONTH</p>
                </div>
                <div className={styles.add_to_cart}>
                  <SquareButton id={`add-to-cart-one-year-${subscription.productId}`} label="Add to Cart" onClick={() => addProduct({ ...subscription, duration: 'full', quantity: 1 })} />
                </div>
              </div>
              <div className={styles.prices_container}>
                <div className={styles.prices}>
                  <h5 className={styles.price_header}>Six Months</h5>
                  <p className={styles.price_subheader}>${subscription.price.half.total} / YEAR</p>
                  <p className={styles.price_subheader}>${subscription.price.half.monthly} / MONTH</p>
                </div>
                <div className={styles.add_to_cart}>
                  <SquareButton id={`add-to-cart-six-months-${subscription.productId}`} label="Add to Cart" onClick={() => addProduct({ ...subscription, duration: 'half', quantity: 1 })} />
                </div>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
}

Subscriptions.propTypes = {
  description: PropTypes.string,
  price: PropTypes.shape({
    full: PropTypes.shape({
      monthly: PropTypes.string,
      total: PropTypes.string
    }),
    half: PropTypes.shape({
      monthly: PropTypes.string,
      total: PropTypes.string
    })
  }),
  productId: PropTypes.string,
  title: PropTypes.string
}

Subscriptions.defaultProps = {
  subscriptions: []
}

export default Subscriptions
