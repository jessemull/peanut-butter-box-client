import { useEffect, useRef } from 'react'
import Icons from './Icons'
import Links from './Links'
import MenuIcon from '../icons/Menu'
import Menu from './Menu'
import MobileSearch from './MobileSearch'

const Appbar = (): JSX.Element => {
  const nav = useRef(null)
  const closeMenu = (): void => {
    if (nav && nav.current) {
      nav.current.classList.remove('nav-open')
    }
  }
  const toggleOpen = (): void => {
    if (nav && nav.current) {
      nav.current.classList.toggle('nav-open')
    }
  }
  useEffect(() => {
    window.addEventListener('resize', closeMenu)
  }, [])
  return (
    <>
      <div className="header">
        <MenuIcon toggleOpen={toggleOpen} />
        <MobileSearch />
      </div>
      <div className="app-bar">
        <div className="app-bar-links">
          <p className="app-bar-title">Peanut Butter Box</p>
          <Links />
        </div>
        <div className="app-bar-icons">
          <Icons />
        </div>
      </div>
      <Menu nav={nav} />
    </>
  )
}

export default Appbar
