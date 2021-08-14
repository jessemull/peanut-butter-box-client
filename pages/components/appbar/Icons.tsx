import Link from 'next/link'
import CartIcon from './../icons/cart'
import ProfileIcon from '../icons/profile'
import SearchIcon from '../icons/search'

const icons = [{
  Icon: ProfileIcon,
  href: '/profile',
  label: 'profile'
}, {
  Icon: SearchIcon,
  label: 'search'
}, {
  Icon: CartIcon,
  href: '/cart',
  label: 'cart'
}]

const Icons = (): JSX.Element => (
  <>
    {icons.map(({ Icon, href, label }) =>
      href
        ? (
            <div className="icon-container">
              <Link href={href} key={label}>
                <a><Icon /></a>
              </Link>
            </div>
          )
        : (
            <div className="icon-container" key={label}>
              <Icon />
            </div>
          )
    )}
  </>
)

export default Icons
