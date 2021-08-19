import Link from 'next/link'
import Icons from './Icons'
import Links from './Links'
import MenuIcon from '../icons/Menu'
import MobileSearch from './MobileSearch'
import styles from './AppBar.module.css'

interface AppBarProps {
  toggleOpen: () => void
}

const Appbar = ({ toggleOpen }: AppBarProps): JSX.Element => {
  return (
    <div style={{ borderBottom: '5px solid black', height: '100px', minHeight: '100px' }}>
      <div className={styles.header}>
        <MenuIcon toggleOpen={toggleOpen} />
        <MobileSearch />
      </div>
      <div className={styles.app_bar}>
        <div className={styles.app_bar_links}>
          <Link href="/" passHref>
            <p className={styles.app_bar_title}>Peanut Butter Box</p>
          </Link>
          <Links />
        </div>
        <div className={styles.app_bar_icons}>
          <Icons />
        </div>
      </div>
    </div>
  )
}

export default Appbar
