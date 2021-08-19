import signin from '../../public/images/signin.webp'
import { LinkButton } from '../buttons'
import styles from './MessageLink.module.css'

interface MessageLinkProps {
  buttonLabel: string,
  href: string,
  message: string
}

const background = `linear-gradient( rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75) ), url(${signin})`

const MessageLink = ({ buttonLabel, href, message }: MessageLinkProps): JSX.Element => (
  <div className={styles.message_link_container} style={{ backgroundImage: background }}>
    <div className={styles.message_link_inner_container}>
      <div className={styles.message_link_message}>{message}</div>
      <div className={styles.message_link_button}>
        <LinkButton id={buttonLabel} href={href} label={buttonLabel} />
      </div>
    </div>
  </div>
)

export default MessageLink
