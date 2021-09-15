import get from 'lodash.get'
import PropTypes from 'prop-types'
import set from 'lodash.set'
import { isValidPhoneNumber } from 'libphonenumber-js'
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react'
import { BasicTextInput } from '../inputs'
import config from '../../config'
import EditIcon from '../icons/Edit'
import styles from './UserInfoForm.module.css'
import { SubmitButton } from '../buttons'
import { OAuthContext } from '../../providers/oauth'
import { doGet, doPut } from '../../util/api'
import { useFetch } from '../../hooks'
import BasicSelect from '../inputs/BasicSelect'

const { placesUrl, usersUrl } = config

interface Errors {
  city?: string;
  countryCode?: string;
  firstName?: string;
  lastName?: string;
  primaryPhone?: string;
  state?: string;
  streetAddress?: string;
  zipCode?: string;
}

interface FormValues {
  city?: string;
  countryCode?: string;
  firstName?: string;
  lastName?: string;
  primaryPhone?: string;
  state?: string;
  streetAddress?: string;
  zipCode?: string;
}

interface Details {
  city: string;
  countryCode: string;
  number: string;
  state: string;
  street: string;
  zipCode: string;
}

interface User {
  city?: string;
  countryCode?: string;
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

interface AddressSuggestion {
  label: string;
  value: string;
}

interface CitySuggestion {
  label: string;
  value: {
    city: string;
    countryCode: string;
    region: string;
  }
}

interface StateSuggestion {
  label: string;
  value: {
    countryCode: string;
    region: string;
  };
}

const defaultErrors = {
  countryCode: '',
  city: '',
  firstName: '',
  lastName: '',
  primaryPhone: '',
  state: '',
  streetAddress: '',
  zipCode: ''
}

const countries = [{
  label: 'United States',
  value: 'US'
}, {
  label: 'Canada',
  value: 'CA'
}]

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
  if (!values.countryCode) {
    errors.state = 'Please enter a country'
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
  const { data: addressSuggestions = [], refetchData: fetchAddresses } = useFetch<Array<AddressSuggestion>, Error>(`${placesUrl}/autocomplete/address?input=${values.streetAddress as string}`, '', true)
  const { data: citySuggestions = [], refetchData: fetchCities } = useFetch<Array<CitySuggestion>, Error>(`${placesUrl}/autocomplete/city?input=${values.city as string}`, '', true)
  const { data: stateSuggestions = [], refetchData: fetchStates } = useFetch<Array<StateSuggestion>, Error>(`${placesUrl}/autocomplete/state?input=${values.state as string}`, '', true)

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

  const onAddressChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const found = addressSuggestions?.find(({ label }) => event.target.value === label)
    if (found) {
      const address = await doGet<Details>(`${placesUrl}/details?placeId=${found.value}`)
      if (address) {
        setValues({ ...values, city: address.city, state: address.state, streetAddress: `${address.number} ${address.street}`, zipCode: address.zipCode })
      }
    } else {
      onChange('streetAddress', event.target.value)
    }
  }

  const onCityChange = (event: ChangeEvent<HTMLInputElement>) => {
    const found = citySuggestions?.find(({ label }) => event.target.value === label)
    if (found) {
      setValues({ ...values, city: found.value.city, countryCode: found.value.countryCode, state: found.value.region })
    } else {
      onChange('city', event.target.value)
    }
  }

  const onStateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const found = stateSuggestions?.find(({ label }) => event.target.value === label)
    if (found) {
      setValues({ ...values, countryCode: found.value.countryCode, state: found.value.region })
    } else {
      onChange('state', event.target.value)
    }
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

  useEffect(() => {
    fetchAddresses()
  }, [values.streetAddress])

  useEffect(() => {
    fetchCities()
  }, [values.city])

  useEffect(() => {
    fetchStates()
  }, [values.state])

  const code = get(values, 'countryCode', '')

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
          onChange={onAddressChange}
          placeholder="Add a street address"
          suggestions={addressSuggestions}
          value={get(values, 'streetAddress', '')}
        />
        <div className={styles.address_block}>
          <div className={styles.city}>
            <BasicTextInput
              autoComplete="address-level2"
              disabled={disabled}
              errors={errors.city}
              label="City"
              onChange={onCityChange}
              placeholder="Add a city"
              suggestions={citySuggestions}
              value={get(values, 'city', '')}
            />
          </div>
          <div className={styles.state}>
            <BasicTextInput
              autoComplete="address-level1"
              disabled={disabled}
              errors={errors.state}
              label="State/Province"
              onChange={onStateChange}
              placeholder="Add a state/province"
              suggestions={stateSuggestions}
              value={get(values, 'state', '')}
            />
          </div>
        </div>
        <BasicSelect
          disabled={disabled}
          errors={errors.countryCode}
          label="Country"
          onChange={(countryCode: { value: string }) => onChange('countryCode', countryCode.value)}
          options={countries}
          placeholder="Select a country"
          value={countries.find(({ value }) => code === value)}
        />
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
