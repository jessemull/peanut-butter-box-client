import Link from 'next/link'
import Icons from './Icons'
import Links from './Links'
import MenuIcon from '../icons/Menu'
import MobileSearch from './MobileSearch'
import styles from './AppBar.module.css'

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

interface AppBarProps {
  subscriptions: Array<Subscription>;
  toggleOpen: () => void
}

const Appbar = ({ subscriptions, toggleOpen }: AppBarProps): JSX.Element => {
  return (
    <div>
      <div className={styles.header}>
        <MenuIcon toggleOpen={toggleOpen} />
        <MobileSearch />
      </div>
      <div className={styles.app_bar}>
        <div className={styles.app_bar_links}>
          <Link href="/">
            <a>
              <h1 className={styles.app_bar_title}>Peanut Butter Box</h1>
            </a>
          </Link>
          <Links />
        </div>
        <div className={styles.app_bar_icons}>
          <Icons subscriptions={subscriptions} />
        </div>
      </div>
    </div>
  )
}

export default Appbar
