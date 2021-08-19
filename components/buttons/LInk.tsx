import Link from 'next/link'
import PropTypes from 'prop-types'
import styles from './Link.module.css'

interface LinkButtonProps {
  href: string;
  id: string;
  label: string;
}

const LinkButton = ({ href, id, label }: LinkButtonProps): JSX.Element => (
  <Link href={href} passHref>
    <button className={styles.link_button} id={id}>{label}</button>
  </Link>
)

LinkButton.propTypes = {
  href: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string
}

export default LinkButton
