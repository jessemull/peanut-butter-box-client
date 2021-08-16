import Link from 'next/link'
import CartIcon from '../icons/Cart'
import ProfileIcon from '../icons/Profile'
import SearchIcon from '../icons/Search'

const icons = [{
  Icon: SearchIcon,
  label: 'search'
}, {
  Icon: ProfileIcon,
  href: '/profile',
  label: 'profile'
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
            <div className="icon-container" key={label}>
              <Link href={href}>
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
