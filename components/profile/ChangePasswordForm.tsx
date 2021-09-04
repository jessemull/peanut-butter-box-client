import get from 'lodash.get'
import set from 'lodash.set'
import { FormEvent, useContext, useState } from 'react'
import BasicTextInput from '../inputs/BasicTextInput'
import config from '../../config'
import styles from './ChangePasswordForm.module.css'
import { SubmitButton } from '../buttons'
import { OAuthContext } from '../../providers/oauth'

const { usersUrl } = config

interface User {
  id: string;
}

interface ChangePasswordFormProps {
  user: User;
}

const ChangePasswordForm = ({ user }: ChangePasswordFormProps): JSX.Element => {
  const { getAccessToken } = useContext(OAuthContext)
  const [loading, setLoading] = useState(false)
  const [values, setValues] = useState({ oldPassword: '', newPassword: '', confirmNewPassword: '' })
  const token = getAccessToken()

  const onChange = (key: string, value: string): void => {
    set(values, key, value)
    setValues({ ...values })
  }

  const onSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault()
    const { newPassword, oldPassword } = values
    try {
      setLoading(true)
      await fetch(`${usersUrl}/change`, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token as string}` }, method: 'POST', body: JSON.stringify({ id: user.id, newPassword, oldPassword }) })
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div className={styles.info_block}>
        <h4 className={styles.info_block_header}>Change Password</h4>
        <BasicTextInput
          autoComplete="current-password"
          label="Current Password"
          onChange={event => onChange('oldPassword', event.target.value)}
          placeholder="Enter current password"
          type="password"
          value={get(values, 'oldPassword', '')}
        />
        <BasicTextInput
          autoComplete="new-password"
          label="New Password"
          onChange={event => onChange('newPassword', event.target.value)}
          placeholder="Enter new password"
          type="password"
          value={get(values, 'newPassword', '')}
        />
        <BasicTextInput
          autoComplete="new-password"
          label="Re-Enter New Password"
          onChange={event => onChange('confirmNewPassword', event.target.value)}
          placeholder="Re-enter new password"
          type="password"
          value={get(values, 'confirmNewPassword', '')}
        />
      </div>
      <div className={styles.submit_button_container}>
        <SubmitButton id="user-submit" loading={loading} type="square" value="Submit" />
      </div>
    </form>
  )
}

export default ChangePasswordForm
