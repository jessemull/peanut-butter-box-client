import { createContext, useState } from 'react'

interface ToastProviderProps {
  children: Array<JSX.Element> | JSX.Element
}

export const ToastContext = createContext({
  error: false,
  message: '',
  show: false,
  showToast: (string, boolean?) => {} // eslint-disable-line
})

const ToastProvider = ({ children }: ToastProviderProps): JSX.Element => {
  const [error, setError] = useState(false)
  const [show, setShow] = useState(false)
  const [message, setMessage] = useState('')

  const showToast = (message: string, error = false): void => {
    setError(error)
    setMessage(message)
    setShow(true)
    setTimeout(() => {
      setShow(false)
      setError(false)
    }, 3000)
  }

  return (
    <ToastContext.Provider value={{
      error,
      message,
      show,
      showToast
    }}>
      {children}
    </ToastContext.Provider>
  )
}

export default ToastProvider
