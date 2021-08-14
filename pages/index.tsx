import Head from 'next/head'
import Link from 'next/link'
import background from '../public/images/home-background.jpg'
import ProfileIcon from './icons/profile'
import SearchIcon from './icons/search'
import CartIcon from './icons/cart'

export default function Home (): JSX.Element {
  return (
    <>
      <Head>
        <title>Peanut Butter Box</title>
        <meta httpEquiv="content-type" content="text/html; charset=utf-8"></meta>
      </Head>
      <div className="header" />
      <div className="app-bar">
        <div className="app-bar-links">
          <p className="app-bar-title">Peanut Butter Box</p>
          <Link href="/subscriptions">
            <a className="app-bar-link">Subscriptions</a>
          </Link>
          <Link href="/subscribe">
            <a className="app-bar-link">Subscribe Now</a>
          </Link>
          <Link href="/reviews">
            <a className="app-bar-link">Reviews</a>
          </Link>
          <Link href="/signup">
            <a className="app-bar-link">Sign Up</a>
          </Link>
          <Link href="/contact">
            <a className="app-bar-link">Contact</a>
          </Link>
          <Link href="/about">
            <a className="app-bar-link">About</a>
          </Link>
        </div>
        <div className="app-bar-icons">
          <div className="icon-container">
            <ProfileIcon />
          </div>
          <div className="app-bar-icon" >
            <SearchIcon />
          </div>
          <div className="app-bar-icon" >
            <CartIcon />
          </div>
        </div>
      </div>
      <img alt="Peanut Butter Box" className="background-image" src={background} />
    </>
  )
}
