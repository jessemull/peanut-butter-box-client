import Appbar from '../appbar'
import Header from '../header'
import styles from './TopNav.module.css'

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

interface TopNavProps {
  subscriptions: Array<Subscription>;
  toggleOpen: () => void
}

const TopNav = ({ subscriptions, toggleOpen }: TopNavProps): JSX.Element => {
  return (
    <div className={styles.top_nav}>
      <Header />
      <Appbar subscriptions={subscriptions} toggleOpen={toggleOpen} />
    </div>
  )
}

export default TopNav
