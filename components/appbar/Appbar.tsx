import { useEffect, useRef } from 'react'
import Icons from './Icons'
import Links from './Links'
import MenuIcon from '../icons/Menu'
import Menu from './Menu'
import MobileSearch from './MobileSearch'
import styles from './AppBar.module.css'

const Appbar = (): JSX.Element => {
  const nav = useRef<HTMLHeadingElement>(null)
  const closeMenu = (): void => {
    if (nav && nav.current) {
      nav.current.classList.remove(styles.nav_open)
    }
  }
  const toggleOpen = (): void => {
    if (nav && nav.current) {
      nav.current.classList.toggle(styles.nav_open)
    }
  }
  useEffect(() => {
    window.addEventListener('resize', closeMenu)
  }, [])
  return (
    <>
      <div className={styles.header}>
        <MenuIcon toggleOpen={toggleOpen} />
        <MobileSearch />
      </div>
      <div className={styles.app_bar}>
        <div className={styles.app_bar_links}>
          <p className={styles.app_bar_title}>Peanut Butter Box</p>
          <Links />
        </div>
        <div className={styles.app_bar_icons}>
          <Icons />
        </div>
      </div>
      <Menu nav={nav} />
    </>
  )
}

export default Appbar
