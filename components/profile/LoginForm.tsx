import get from 'lodash.get'
import PropTypes from 'prop-types'
import set from 'lodash.set'
import { useEffect, useState } from 'react'
import BasicTextInput from './BasicTextInput'
import styles from './Accordion.module.css'

interface LoginFormProps {
  user: {
    login: string;
  }
}

const LoginForm = ({ user }: LoginFormProps): JSX.Element => {
  const [values, setValues] = useState({})

  const onChange = (key: string, value: string): void => {
    set(values, key, value)
    setValues({ ...values })
  }

  useEffect(() => {
    setValues(user)
  }, [user])

  return (
    <form>
      <div className={styles.info_block}>
        <h4 className={styles.info_block_header}>User E-Mail / Login</h4>
        <BasicTextInput
          autoComplete="username"
          disabled={true}
          label="Login"
          onChange={event => onChange('login', event.target.value)}
          placeholder="Add a login"
          value={get(values, 'login', '') as string}
        />
      </div>
    </form>
  )
}

LoginForm.propTypes = {
  user: PropTypes.shape({
    login: PropTypes.string
  })
}

export default LoginForm
