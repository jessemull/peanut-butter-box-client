import get from 'lodash.get'
import PropTypes from 'prop-types'
import set from 'lodash.set'
import { FormEvent, useContext, useEffect, useState } from 'react'
import { BasicTextInput } from '../inputs'
import config from '../../config'
import styles from './ChangePasswordForm.module.css'
import { SubmitButton } from '../buttons'
import { OAuthContext } from '../../providers/oauth'
import { passwordUtil } from '../../util'
import { doPost } from '../../util/api'
import { ToastContext } from '../../providers/toast'

const { usersUrl } = config

interface User {
  id: string;
}

interface ChangePasswordFormProps {
  selected: boolean;
  user: User;
}

interface Errors {
  confirmNewPassword?: string;
  newPassword?: Array<string>;
  oldPassword?: string;
}

interface FormValues {
  confirmNewPassword: string;
  newPassword: string;
  oldPassword: string;
}

const defaultErrors = { oldPassword: '', newPassword: [] as string[], confirmNewPassword: '', resetError: '' }

const defaultValues = { oldPassword: '', newPassword: '', confirmNewPassword: '' }

const validate = (values: FormValues): Errors => {
  const errors: Errors = {}
  const isValidPassword = passwordUtil.validator.validate(values.newPassword, { list: true })
  const isValidVerifyPassword = values.confirmNewPassword === values.newPassword
  if (isValidPassword.length > 0) {
    errors.newPassword = passwordUtil.getPasswordErrorMessages(isValidPassword)
  }
  if (!isValidVerifyPassword) {
    errors.confirmNewPassword = 'Passwords do not match'
  }
  return errors
}

const ChangePasswordForm = ({ selected, user }: ChangePasswordFormProps): JSX.Element => {
  const { getAccessToken } = useContext(OAuthContext)
  const { showToast } = useContext(ToastContext)
  const [errors, setErrors] = useState<Errors>({ ...defaultErrors })
  const [loading, setLoading] = useState(false)
  const [values, setValues] = useState<FormValues>({ ...defaultValues })
  const token = getAccessToken()

  const onChange = (key: string, value: string): void => {
    set(values, key, value)
    setValues({ ...values })
  }

  const onSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault()
    const { newPassword, oldPassword } = values
    const validated = validate(values)
    if (Object.keys(validated).length === 0) {
      try {
        setLoading(true)
        setErrors({ ...defaultErrors })
        await doPost(`${usersUrl}/change`, JSON.stringify({ id: user.id, newPassword, oldPassword }), { Authorization: `Bearer ${token as string}` })
        setLoading(false)
        showToast('Password updated!')
      } catch (error) {
        setLoading(false)
        showToast('Oops! Password update failed!', true)
      }
    } else {
      setErrors({ ...validated })
    }
  }

  useEffect(() => {
    setErrors({ ...defaultErrors })
    setValues({ ...defaultValues })
  }, [selected])

  return (
    <form onSubmit={onSubmit}>
      <div className={styles.info_block}>
        <h4 className={styles.info_block_header}>Change Password</h4>
        <BasicTextInput
          autoComplete="current-password"
          id="current-password"
          label="Current Password"
          onChange={event => onChange('oldPassword', event.target.value)}
          placeholder="Enter current password"
          type="password"
          value={get(values, 'oldPassword', '')}
        />
        <BasicTextInput
          autoComplete="new-password"
          errors={errors.newPassword}
          id="new-password"
          label="New Password"
          onChange={event => onChange('newPassword', event.target.value)}
          placeholder="Enter new password"
          type="password"
          value={get(values, 'newPassword', '')}
        />
        <BasicTextInput
          autoComplete="new-password"
          errors={errors.confirmNewPassword}
          id="new-password-confirm"
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

ChangePasswordForm.propTypes = {
  selected: PropTypes.bool,
  user: PropTypes.shape({
    id: PropTypes.string
  })
}

export default ChangePasswordForm
