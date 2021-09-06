import get from 'lodash.get'
import set from 'lodash.set'
import { FormEvent, useContext, useState } from 'react'
import { BasicTextInput } from '../inputs'
import config from '../../config'
import styles from './ChangePasswordForm.module.css'
import { SubmitButton } from '../buttons'
import { OAuthContext } from '../../providers/oauth'
import { passwordUtil } from '../../util'

const { usersUrl } = config

interface User {
  id: string;
}

interface ChangePasswordFormProps {
  user: User;
}

const defaultErrors = { oldPassword: '', newPassword: [] as string[], confirmNewPassword: '', resetError: '' }

const defaultValues = { oldPassword: '', newPassword: '', confirmNewPassword: '' }

const ChangePasswordForm = ({ user }: ChangePasswordFormProps): JSX.Element => {
  const { getAccessToken } = useContext(OAuthContext)
  const [errors, setErrors] = useState(defaultErrors)
  const [loading, setLoading] = useState(false)
  const [values, setValues] = useState(defaultValues)
  const token = getAccessToken()

  const onChange = (key: string, value: string): void => {
    set(values, key, value)
    setValues({ ...values })
  }
  console.log(errors.resetError)
  const onSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault()
    const { confirmNewPassword, newPassword, oldPassword } = values
    const isValidPassword = passwordUtil.validator.validate(newPassword, { list: true })
    const isValidVerifyPassword = confirmNewPassword === newPassword
    if (isValidPassword.length === 0 && isValidVerifyPassword) {
      try {
        setLoading(true)
        setErrors(defaultErrors)
        await fetch(`${usersUrl}/change`, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token as string}` }, method: 'POST', body: JSON.stringify({ id: user.id, newPassword, oldPassword }) })
        setLoading(false)
      } catch (error) {
        setLoading(false)
        errors.resetError = get(error, 'error', 'Could not change password!') as string
        setErrors({ ...errors })
      }
    } else {
      if (isValidPassword.length > 0) {
        errors.newPassword = passwordUtil.getPasswordErrorMessages(isValidPassword)
      }
      if (!isValidVerifyPassword) {
        errors.confirmNewPassword = 'Passwords do not match'
      }
      setErrors({ ...errors })
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
          errors={errors.newPassword}
          label="New Password"
          onChange={event => onChange('newPassword', event.target.value)}
          placeholder="Enter new password"
          type="password"
          value={get(values, 'newPassword', '')}
        />
        <BasicTextInput
          autoComplete="new-password"
          errors={errors.confirmNewPassword}
          label="Re-Enter New Password"
          onChange={event => onChange('confirmNewPassword', event.target.value)}
          placeholder="Re-enter new password"
          type="password"
          value={get(values, 'confirmNewPassword', '')}
        />
      </div>
      {errors.resetError &&
        <div className={styles.reset_error_container}>
          <div className={styles.reset_error}>{errors.resetError}</div>
        </div>
      }
      <div className={styles.submit_button_container}>
        <SubmitButton id="user-submit" loading={loading} type="square" value="Submit" />
      </div>
    </form>
  )
}

export default ChangePasswordForm
