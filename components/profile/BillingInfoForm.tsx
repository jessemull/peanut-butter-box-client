import get from 'lodash.get'
import PropTypes from 'prop-types'
import set from 'lodash.set'
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react'
import { BasicTextInput } from '../inputs'
import { api, validators } from '../../util'
import config from '../../config'
import EditIcon from '../icons/Edit'
import styles from './BillingInfoForm.module.css'
import { SubmitButton } from '../buttons'
import { useFetch } from '../../hooks'
import BasicSelect from '../inputs/BasicSelect'
import Checkbox from '../inputs/Checkbox'
import { ToastContext } from '../../providers/toast'
import ProgressDots from '../progress/ProgressDots'

const { placesUrl } = config

interface Errors {
  city?: string;
  countryCode?: string;
  state?: string;
  streetAddress?: string;
  zipCode?: string;
}

interface FormValues {
  city?: string;
  countryCode?: string;
  state?: string;
  streetAddress?: string;
  useMailingAddress?: boolean;
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

interface Billing {
  city?: string;
  countryCode?: string;
  state?: string;
  streetAddress?: string;
  useMailingAddress?: boolean;
  zipCode?: string;
}

interface User {
  city?: string;
  countryCode?: string;
  state?: string;
  streetAddress?: string;
  zipCode?: string;
}

interface BillingInfoFormProps {
  billing: Billing;
  user: User;
  selected: boolean;
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
  if (values.city || values.countryCode || values.state || values.streetAddress || values.zipCode) {
    if (!values.city) {
      errors.city = 'Please enter a city'
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
    if (values.zipCode && !validators.isValidZipCode(values.zipCode)) {
      errors.zipCode = 'Please enter a zip code'
    }
  }
  return errors
}

const BillingInfoForm = ({ billing, selected, user }: BillingInfoFormProps): JSX.Element => {
  const { showToast } = useContext(ToastContext)
  const [addressLoading, setAddressLoading] = useState(false)
  const [errors, setErrors] = useState<Errors>({ ...defaultErrors })
  const [disabled, setDisabled] = useState(true)
  const [loading, setLoading] = useState(false)
  const [values, setValues] = useState<FormValues>({})
  const { data: addressSuggestions = [], refetchData: fetchAddresses } = useFetch<Array<AddressSuggestion>, Error>(`${placesUrl}/autocomplete/address?input=${values.streetAddress as string}`, '', true)
  const { data: citySuggestions = [], refetchData: fetchCities } = useFetch<Array<CitySuggestion>, Error>(`${placesUrl}/autocomplete/city?input=${values.city as string}`, '', true)
  const { data: stateSuggestions = [], refetchData: fetchStates } = useFetch<Array<StateSuggestion>, Error>(`${placesUrl}/autocomplete/state?input=${values.state as string}`, '', true)

  const onEdit = () => {
    if (!disabled) {
      setErrors({ ...defaultErrors })
      setValues({ ...billing })
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }

  const onChange = (key: string, value: string | boolean): void => {
    set(values, key, value)
    setValues({ ...values })
  }

  const onAddressChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const found = addressSuggestions?.find(({ label }) => event.target.value === label)
    if (found) {
      setAddressLoading(true)
      const address = await api.doGet<Details>(`${placesUrl}/details?placeId=${found.value}`)
      if (address) {
        const streetAddress = address.number && address.street ? `${address.number} ${address.street}` : `${address.number || ''}${address.street || ''}`
        setValues({ ...values, city: address.city, countryCode: address.countryCode, state: address.state, streetAddress, zipCode: address.zipCode })
      }
      setAddressLoading(false)
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

  const onUseMailingAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setValues({ ...values, city: user.city, countryCode: user.countryCode, state: user.state, streetAddress: user.streetAddress, useMailingAddress: true, zipCode: user.zipCode })
    } else {
      onChange('useMailingAddress', false)
    }
  }

  const onSubmit = (event: FormEvent): void => {
    event.preventDefault()
    const validated = validate(values)
    if (Object.keys(validated).length === 0) {
      try {
        setLoading(true)
        setErrors({ ...defaultErrors })
        console.log(values)
        setLoading(false)
        showToast('Billing updated!')
      } catch (error) {
        setLoading(false)
        showToast('Oops! Billing update failed!', true)
      }
    } else {
      setErrors({ ...validated })
    }
  }

  useEffect(() => {
    setValues({ ...billing })
  }, [billing])

  useEffect(() => {
    if (!selected) {
      setErrors({ ...defaultErrors })
      setValues({ ...billing })
      setDisabled(true)
    }
  }, [selected, billing])

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
        <div aria-label="Edit Billing Information" className={styles.edit_icon} onClick={onEdit} role="button" tabIndex={0}>
          <EditIcon />
        </div>
        <h4 className={styles.info_block_header}>Billing Address</h4>
        <Checkbox disabled={disabled} id="use-mailing-address" checked={Boolean(values.useMailingAddress)} label="Use Mailing Address" onChange={onUseMailingAddressChange} />
        {addressLoading &&
          <div className={styles.address_loading}>
            <ProgressDots />
          </div>
        }
        {!values.useMailingAddress && !addressLoading &&
          <>
            <BasicTextInput
              autoComplete="street-address"
              disabled={disabled}
              errors={errors.streetAddress}
              id="billing-street-address"
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
                  id="billing-city"
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
                  id="billing-state"
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
              id="billing-zip-code"
              label="Postal/Zip Code"
              onChange={event => onChange('zipCode', event.target.value)}
              placeholder="Add a postal code"
              value={get(values, 'zipCode', '')}
            />
          </>
        }
      </div>
      {!disabled &&
        <div className={styles.submit_button_container}>
          <SubmitButton id="billing-submit" loading={loading} type="square" value="Submit" />
        </div>
      }
    </form>
  )
}

BillingInfoForm.propTypes = {
  billing: PropTypes.shape({
    city: PropTypes.string,
    countryCode: PropTypes.string,
    state: PropTypes.string,
    streetAddress: PropTypes.string,
    useMailingAddress: PropTypes.string,
    zipCode: PropTypes.string
  }),
  user: PropTypes.shape({
    city: PropTypes.string,
    countryCode: PropTypes.string,
    state: PropTypes.string,
    streetAddress: PropTypes.string,
    zipCode: PropTypes.string
  }),
  selected: PropTypes.bool
}

export default BillingInfoForm
