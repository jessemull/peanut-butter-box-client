import Appbar from '../appbar'
import Header from '../header'
import styles from './TopNav.module.css'

interface TopNavProps {
  toggleOpen: () => void
}

const TopNav = ({ toggleOpen }: TopNavProps): JSX.Element => (
  <div className={styles.top_nav}>
    <Header />
    <Appbar toggleOpen={toggleOpen} />
  </div>
)

export default TopNav
