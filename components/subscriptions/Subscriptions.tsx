import { useEffect, useState } from 'react'
import { useFetch } from '../../hooks'
import config from '../../config'
import SquareButton from '../buttons/Square'
import styles from './Subscriptions.module.css'

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
          : subscriptions.map(({ description, price, productId, title }) => (
            <div className={styles.product} key={productId}>
              <h4 className={styles.title}>{title}</h4>
              <p className={styles.description}>{description}</p>
              <div className={styles.all_prices}>
                <div className={styles.prices_container}>
                  <div className={styles.prices}>
                    <h5 className={styles.price_header}>One Year</h5>
                    <p className={styles.price_subheader}>${price.full.total} / YEAR</p>
                    <p className={styles.price_subheader}>${price.full.monthly} / MONTH</p>
                  </div>
                  <div className={styles.add_to_cart}>
                    <SquareButton id={`add-to-cart-one-year-${productId}`} label="Add to Cart" onClick={() => console.log('one year')} />
                  </div>
                </div>
                <div className={styles.prices_container}>
                  <div className={styles.prices}>
                    <h5 className={styles.price_header}>Six Months</h5>
                    <p className={styles.price_subheader}>${price.half.total} / YEAR</p>
                    <p className={styles.price_subheader}>${price.half.monthly} / MONTH</p>
                  </div>
                  <div className={styles.add_to_cart}>
                    <SquareButton id={`add-to-cart-six-months-${productId}`} label="Add to Cart" onClick={() => console.log('six months')} />
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
