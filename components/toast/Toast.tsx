import PropTypes from 'prop-types'
import { useEffect, useRef } from 'react'
import styles from './Toast.module.css'

interface ToastProps {
  error?: boolean;
  message: string;
  show: boolean;
}

const Toast = ({ error, message, show }: ToastProps): JSX.Element => {
  const toast = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (show) {
      if (toast && toast.current) {
        toast.current.classList.toggle(styles.show)
      }
    } else {
      if (toast && toast.current) {
        toast.current.classList.remove(styles.show)
      }
    }
  }, [show])

  const className = error ? `${styles.toast} ${styles.error}` : styles.toast

  return (
    <div className={className} ref={toast} style={{ backgroundColor: error ? '#CC0000' : '#429CD6' }}>
      <div>{message}</div>
    </div>
  )
}

Toast.propTypes = {
  error: PropTypes.bool,
  message: PropTypes.string,
  show: PropTypes.bool
}

export default Toast
