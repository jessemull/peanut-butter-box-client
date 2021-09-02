import { useContext, useState } from 'react'
import config from '../../config'
import { useFetch } from '../../hooks'
import { OAuthContext } from '../../providers/oauth'
import styles from './Accordion.module.css'
import BillingInfoForm from './BillingInfoForm'
import ChangePasswordForm from './ChangePasswordForm'
import LoginForm from './LoginForm'
import Step from './Step'
import UserInfoForm from './UserInfoForm'

const { usersUrl } = config

interface Billing {
  city: string;
  state: string;
  streetAddress: string;
  zipCode: string;
}

interface User {
  city?: string;
  email: string;
  id: string;
  firstName: string;
  lastName: string;
  login: string;
  primaryPhone?: string;
  state?: string;
  streetAddress?: string;
  zipCode?: string;
}

interface Error {
  message: string;
}

const Accordion = (): JSX.Element => {
  const [selected, setSelected] = useState('')
  const { getAccessToken } = useContext(OAuthContext)
  const { data = {} } = useFetch<User, Error>(usersUrl, getAccessToken())

  const onSelect = (title: string): void => {
    setSelected(selected === title ? '' : title)
  }

  return (
    <div className={styles.accordion}>
      <nav className={styles.menu}>
        <Step onSelect={onSelect} selected={selected} title="User">
          <UserInfoForm user={data as User} />
        </Step>
        <Step onSelect={onSelect} selected={selected} title="Billing">
          <BillingInfoForm billing={{} as Billing} />
        </Step>
        <Step onSelect={onSelect} selected={selected} title="Login">
          <LoginForm user={data as User} />
        </Step>
        <Step onSelect={onSelect} selected={selected} title="Password">
          <ChangePasswordForm />
        </Step>
        <Step onSelect={onSelect} selected={selected} title="Orders"></Step>
      </nav>
    </div>
  )
}

export default Accordion
