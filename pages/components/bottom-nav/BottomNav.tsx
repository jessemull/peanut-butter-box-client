import Link from 'next/link'
import CartIcon from '../icons/Cart'
import ProfileIcon from '../icons/Profile'

const icons = [{
  Icon: ProfileIcon,
  href: '/profile',
  label: 'Profile'
}, {
  Icon: CartIcon,
  href: '/cart',
  label: 'Cart'
}]

const Icons = (): JSX.Element => (
  <div className="bottom-nav">
    {icons.map(({ Icon, href, label }) => (
      <Link href={href} key={label} passHref>
        <div className="icon-container-bottom-nav">
          <div className="icon-container-bottom-nav-inner">
            <Icon size={26} />
            <p className="icon-container-bottom-nav-label">{label}</p>
          </div>
        </div>
      </Link>
    ))}
  </div>
)

export default Icons
