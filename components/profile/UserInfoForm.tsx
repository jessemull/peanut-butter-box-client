import get from 'lodash.get'
import PropTypes from 'prop-types'
import set from 'lodash.set'
import { FormEvent, useContext, useEffect, useState } from 'react'
import { BasicTextInput } from '../inputs'
import config from '../../config'
import EditIcon from '../icons/Edit'
import styles from './UserInfoForm.module.css'
import { SubmitButton } from '../buttons'
import { OAuthContext } from '../../providers/oauth'

const { usersUrl } = config

interface User {
  city?: string;
  firstName: string;
  lastName: string;
  primaryPhone?: string;
  state?: string;
  streetAddress?: string;
  zipCode?: string;
}

interface UserInfoFormProps {
  user: User;
}

const UserInfoForm = ({ user }: UserInfoFormProps): JSX.Element => {
  const { getAccessToken } = useContext(OAuthContext)
  const [disabled, setDisabled] = useState(true)
  const [loading, setLoading] = useState(false)
  const [values, setValues] = useState({})
  const token = getAccessToken()

  const onEdit = () => {
    setDisabled(!disabled)
  }

  const onChange = (key: string, value: string): void => {
    set(values, key, value)
    setValues({ ...values })
  }

  const onSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault()
    try {
      setLoading(true)
      await fetch(`${usersUrl}`, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token as string}` }, method: 'PUT', body: JSON.stringify({ ...values }) })
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  useEffect(() => {
    setValues(user)
  }, [user])

  return (
    <form onSubmit={onSubmit}>
      <div className={styles.info_block}>
        <div aria-label="Edit User Information" className={styles.edit_icon} onClick={onEdit} role="button" tabIndex={0}>
          <EditIcon />
        </div>
        <h4 className={styles.info_block_header}>User Info</h4>
        <BasicTextInput
          autoComplete="given-name"
          disabled={disabled}
          label="First Name"
          onChange={event => onChange('firstName', event.target.value)}
          placeholder="Add a first name"
          value={get(values, 'firstName', '') as string}
        />
        <BasicTextInput
          autoComplete="family-name"
          disabled={disabled}
          label="Last Name"
          onChange={event => onChange('lastName', event.target.value)}
          placeholder="Add a last name"
          value={get(values, 'lastName', '') as string}
        />
        <BasicTextInput
          autoComplete="tel"
          disabled={disabled}
          label="Phone"
          onChange={event => onChange('primaryPhone', event.target.value)}
          placeholder="Add a phone number"
          value={get(values, 'primaryPhone', '') as string}
        />
        <h4 className={styles.info_block_header}>User Address</h4>
        <BasicTextInput
          autoComplete="street-address"
          disabled={disabled}
          label="Street Address"
          onChange={event => onChange('streetAddress', event.target.value)}
          placeholder="Add a street address"
          value={get(values, 'streetAddress', '') as string}
        />
        <div className={styles.address_block}>
          <BasicTextInput
            autoComplete="address-level2"
            disabled={disabled}
            label="City"
            onChange={event => onChange('city', event.target.value)}
            placeholder="Add a city"
            value={get(values, 'city', '') as string}
          />
          <BasicTextInput
            autoComplete="address-level1"
            disabled={disabled}
            label="State/Province"
            onChange={event => onChange('state', event.target.value)}
            placeholder="Add a state/province"
            value={get(values, 'state', '') as string}
          />
        </div>
        <BasicTextInput
          autoComplete="postal-code"
          disabled={disabled}
          label="Postal/Zip Code"
          onChange={event => onChange('zipCode', event.target.value)}
          placeholder="Add a postal code"
          value={get(values, 'zipCode', '') as string}
        />
      </div>
      {!disabled &&
        <div className={styles.submit_button_container}>
          <SubmitButton id="user-submit" loading={loading} type="square" value="Submit" />
        </div>
      }
    </form>
  )
}

UserInfoForm.propTypes = {
  user: PropTypes.shape({
    city: PropTypes.string,
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    primaryPhone: PropTypes.string,
    state: PropTypes.string,
    streetAddress: PropTypes.string,
    zipCode: PropTypes.string
  })
}

export default UserInfoForm
