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
    setSubscriptions(data.reverse())
  }, [data])

  return (
    <div className={styles.subscriptions} id="subscriptions">
      {
        loading
          ? <div>Loading...</div>
          : subscriptions.map(({ description, price, productId, title }) => (
            <div className={styles.product} key={productId}>
              <div className={styles.title}>{title}</div>
              <div className={styles.description}>{description}</div>
              <div className={styles.all_prices}>
                <div className={styles.prices_container}>
                  <div className={styles.prices}>
                    <div className={styles.price_header}>One Year</div>
                    <div className={styles.price_subheader}>${price.full.total} / YEAR</div>
                    <div className={styles.price_subheader}>${price.full.monthly} / MONTH</div>
                  </div>
                  <div className={styles.add_to_cart}>
                    <SquareButton id="add-to-cart-one-year" label="Add to Cart" />
                  </div>
                </div>
                <div className={styles.prices_container}>
                  <div className={styles.prices}>
                    <div className={styles.price_header}>Six Months</div>
                    <div className={styles.price_subheader}>${price.half.total} / YEAR</div>
                    <div className={styles.price_subheader}>${price.half.monthly} / MONTH</div>
                  </div>
                  <div className={styles.add_to_cart}>
                    <SquareButton id="add-to-cart-six-months" label="Add to Cart" />
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
