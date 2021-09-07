import get from 'lodash.get'
import PropTypes from 'prop-types'
import set from 'lodash.set'
import { isValidPhoneNumber } from 'libphonenumber-js'
import { FormEvent, useContext, useEffect, useState } from 'react'
import { BasicTextInput } from '../inputs'
import config from '../../config'
import EditIcon from '../icons/Edit'
import styles from './UserInfoForm.module.css'
import { SubmitButton } from '../buttons'
import { OAuthContext } from '../../providers/oauth'
import { doPut } from '../../util/api'

const { usersUrl } = config

interface Errors {
  city?: string;
  firstName?: string;
  lastName?: string;
  primaryPhone?: string;
  state?: string;
  streetAddress?: string;
  zipCode?: string;
}

interface FormValues {
  city?: string;
  firstName?: string;
  lastName?: string;
  primaryPhone?: string;
  state?: string;
  streetAddress?: string;
  zipCode?: string;
}

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
  refetchUser: () => void;
  selected: boolean;
  user: User;
}

const defaultErrors = {
  city: '',
  firstName: '',
  lastName: '',
  primaryPhone: '',
  state: '',
  streetAddress: '',
  zipCode: ''
}

const validate = (values: FormValues): Errors => {
  const errors: Errors = {}
  if (!values.city) {
    errors.city = 'Please enter a city'
  }
  if (!values.firstName) {
    errors.firstName = 'Please enter a first name'
  }
  if (!values.lastName) {
    errors.lastName = 'Please enter a last name'
  }
  if (!values.primaryPhone) {
    errors.primaryPhone = 'Please enter a primary phone number'
  }
  if (values.primaryPhone && !isValidPhoneNumber(values.primaryPhone, 'US')) {
    errors.primaryPhone = 'Please enter a valid phone number'
  }
  if (!values.state) {
    errors.state = 'Please enter a state'
  }
  if (!values.streetAddress) {
    errors.streetAddress = 'Please enter a street address'
  }
  if (!values.zipCode) {
    errors.zipCode = 'Please enter a zip code'
  }
  return errors
}

const UserInfoForm = ({ refetchUser, selected, user }: UserInfoFormProps): JSX.Element => {
  const { getAccessToken } = useContext(OAuthContext)
  const [errors, setErrors] = useState<Errors>({ ...defaultErrors })
  const [disabled, setDisabled] = useState(true)
  const [loading, setLoading] = useState(false)
  const [values, setValues] = useState<FormValues>({})
  const token = getAccessToken()

  const onEdit = () => {
    if (!disabled) {
      setErrors({ ...defaultErrors })
      setValues({ ...user })
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }

  const onChange = (key: string, value: string): void => {
    set(values, key, value)
    setValues({ ...values })
  }

  const onSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault()
    const validated = validate(values)
    if (Object.keys(validated).length === 0) {
      try {
        setLoading(true)
        setErrors({ ...defaultErrors })
        await doPut(`${usersUrl}`, JSON.stringify({ ...values }), { Authorization: `Bearer ${token as string}` })
        setLoading(false)
        refetchUser()
      } catch (error) {
        setLoading(false)
      }
    } else {
      setErrors({ ...validated })
    }
  }

  useEffect(() => {
    setValues({ ...user })
  }, [user])

  useEffect(() => {
    if (!selected) {
      setErrors({ ...defaultErrors })
      setValues({ ...user })
      setDisabled(true)
    }
  }, [selected, user])

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
          errors={errors.firstName}
          label="First Name"
          onChange={event => onChange('firstName', event.target.value)}
          placeholder="Add a first name"
          value={get(values, 'firstName', '')}
        />
        <BasicTextInput
          autoComplete="family-name"
          disabled={disabled}
          errors={errors.lastName}
          label="Last Name"
          onChange={event => onChange('lastName', event.target.value)}
          placeholder="Add a last name"
          value={get(values, 'lastName', '')}
        />
        <BasicTextInput
          autoComplete="tel"
          disabled={disabled}
          errors={errors.primaryPhone}
          label="Phone"
          onChange={event => onChange('primaryPhone', event.target.value)}
          placeholder="Add a phone number"
          value={get(values, 'primaryPhone', '')}
        />
        <h4 className={styles.info_block_header}>User Address</h4>
        <BasicTextInput
          autoComplete="street-address"
          disabled={disabled}
          errors={errors.streetAddress}
          label="Street Address"
          onChange={event => onChange('streetAddress', event.target.value)}
          placeholder="Add a street address"
          value={get(values, 'streetAddress', '')}
        />
        <div className={styles.address_block}>
          <BasicTextInput
            autoComplete="address-level2"
            disabled={disabled}
            errors={errors.city}
            label="City"
            onChange={event => onChange('city', event.target.value)}
            placeholder="Add a city"
            value={get(values, 'city', '')}
          />
          <BasicTextInput
            autoComplete="address-level1"
            disabled={disabled}
            errors={errors.state}
            label="State/Province"
            onChange={event => onChange('state', event.target.value)}
            placeholder="Add a state/province"
            value={get(values, 'state', '')}
          />
        </div>
        <BasicTextInput
          autoComplete="postal-code"
          disabled={disabled}
          errors={errors.zipCode}
          label="Postal/Zip Code"
          onChange={event => onChange('zipCode', event.target.value)}
          placeholder="Add a postal code"
          value={get(values, 'zipCode', '')}
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
  refetchUser: PropTypes.func,
  selected: PropTypes.bool,
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
