import get from 'lodash.get'
import set from 'lodash.set'
import { FormEvent, useState } from 'react'
import BasicTextInput from './BasicTextInput'
import EditIcon from '../icons/Edit'
import styles from './Accordion.module.css'
import { SubmitButton } from '../buttons'

const ChangePasswordForm = (): JSX.Element => {
  const [disabled, setDisabled] = useState(true)
  const [values, setValues] = useState({ password: '', newPassword: '', confirmNewPassword: '' })

  const onEdit = () => {
    setDisabled(!disabled)
  }

  const onChange = (key: string, value: string): void => {
    set(values, key, value)
    setValues({ ...values })
  }

  const onSubmit = (event: FormEvent): void => {
    event.preventDefault()
    console.log(values)
  }

  return (
    <form onSubmit={onSubmit}>
      <div className={styles.info_block}>
        <div aria-label="Change Password" className={styles.edit_icon} onClick={onEdit} role="button" tabIndex={0}>
          <EditIcon />
        </div>
        <h4 className={styles.info_block_header}>Change Password</h4>
        <BasicTextInput
          autoComplete="current-password"
          disabled={disabled}
          label="Current Password"
          onChange={event => onChange('password', event.target.value)}
          placeholder="Enter current password"
          value={get(values, 'password', '')}
        />
        <BasicTextInput
          autoComplete="new-password"
          disabled={disabled}
          label="New Password"
          onChange={event => onChange('newPassword', event.target.value)}
          placeholder="Enter new password"
          value={get(values, 'newPassword', '')}
        />
        <BasicTextInput
          autoComplete="new-password"
          disabled={disabled}
          label="Re-Enter New Password"
          onChange={event => onChange('confirmNewPassword', event.target.value)}
          placeholder="Re-enter new password"
          value={get(values, 'confirmNewPassword', '')}
        />
      </div>
      {!disabled &&
        <div className={styles.submit_button_container}>
          <SubmitButton id="user-submit" type="square" value="Submit" />
        </div>
      }
    </form>
  )
}

export default ChangePasswordForm
