import Link from 'next/link'

const links = [{
  href: '#subscriptions',
  label: 'Subscriptions'
}, {
  href: '/subscribe',
  label: 'Subscribe Now'
}, {
  href: '/reviews',
  label: 'Reviews'
}, {
  href: '/signup',
  label: 'Sign Up'
}, {
  href: '/contact',
  label: 'Contact'
}, {
  href: '/about',
  label: 'About'
}]

const Links = (): JSX.Element => (
  <>
    {links.map(({ href, label }) => (
      <Link href={href} key={href}>
        <a className="app-bar-link">{label}</a>
      </Link>
    ))}
  </>
)

export default Links
