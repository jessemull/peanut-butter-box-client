import { useContext, useEffect, useState } from 'react'
import { useFetch } from '../../hooks'
import config from '../../config'
import SquareButton from '../buttons/Square'
import styles from './Subscriptions.module.css'
import { CartContext } from '../../providers/cart'

const { productsUrl } = config

interface Subscription {
  description: string;
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

const Subscriptions = (): JSX.Element => {
  const [subscriptions, setSubscriptions] = useState<Array<Subscription>>([])
  const { addProduct } = useContext(CartContext)
  const { data = [], loading } = useFetch(productsUrl)

  useEffect(() => {
    if (data.length > 0) {
      setSubscriptions(data.reverse())
    }
  }, [loading]) // eslint-disable-line

  return (
    <div className={styles.subscriptions} id="subscriptions">
      {
        loading
          ? <div>Loading...</div>
          : subscriptions.map(subscription => (
            <div className={styles.product} key={subscription.productId}>
              <h4 className={styles.title}>{subscription.title}</h4>
              <p className={styles.description}>{subscription.description}</p>
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

export default Subscriptions
