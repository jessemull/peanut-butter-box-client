import get from 'lodash.get'
import PropTypes from 'prop-types'
import set from 'lodash.set'
import { FormEvent, useEffect, useState } from 'react'
import { BasicTextInput } from '../inputs'
import EditIcon from '../icons/Edit'
import styles from './BillingInfoForm.module.css'
import { SubmitButton } from '../buttons'

interface Billing {
  city?: string;
  state?: string;
  streetAddress?: string;
  zipCode?: string;
}

interface BillingInfoFormProps {
  billing: Billing;
  selected: boolean;
}

interface Errors {
  city?: string;
  state?: string;
  streetAddress?: string;
  zipCode?: string;
}

interface FormValues {
  city?: string;
  state?: string;
  streetAddress?: string;
  zipCode?: string;
}

const defaultErrors = {
  city: '',
  state: '',
  streetAddress: '',
  zipCode: ''
}

const validate = (values: FormValues): Errors => {
  const errors: Errors = {}
  if (!values.city) {
    errors.city = 'Please enter a city'
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

const BillingInfoForm = ({ billing, selected }: BillingInfoFormProps): JSX.Element => {
  const [disabled, setDisabled] = useState(true)
  const [errors, setErrors] = useState<Errors>({})
  const [loading, setLoading] = useState(false)
  const [values, setValues] = useState<FormValues>({})

  const onEdit = () => {
    if (!disabled) {
      setErrors({ ...defaultErrors })
      setValues({ ...billing })
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }

  const onChange = (key: string, value: string): void => {
    set(values, key, value)
    setValues({ ...values })
  }

  const onSubmit = (event: FormEvent): void => {
    event.preventDefault()
    const validated = validate(values)
    if (Object.keys(validated).length === 0) {
      try {
        setLoading(true)
        setErrors({ ...defaultErrors })
        setTimeout(() => {
          setLoading(false)
        }, 2000)
      } catch (error) {
        setLoading(false)
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
  }, [billing, selected])

  return (
    <form onSubmit={onSubmit}>
      <div className={styles.info_block}>
        <div aria-label="Edit Billing Information" className={styles.edit_icon} onClick={onEdit} role="button" tabIndex={0}>
          <EditIcon />
        </div>
        <h4 className={styles.info_block_header}>Billing Address</h4>
        <BasicTextInput
          autoComplete="street-address"
          disabled={disabled}
          errors={errors.streetAddress}
          label="Street Address"
          onChange={event => onChange('billingAddress.streetAddress', event.target.value)}
          placeholder="Add a street address"
          value={get(values, 'billingAddress.streetAddress', '') as string}
        />
        <div className={styles.address_block}>
          <BasicTextInput
            autoComplete="address-level2"
            disabled={disabled}
            errors={errors.city}
            label="City"
            onChange={event => onChange('billingAddress.city', event.target.value)}
            placeholder="Add a city"
            value={get(values, 'billingAddress.city', '') as string}
          />
          <BasicTextInput
            autoComplete="address-level1"
            disabled={disabled}
            errors={errors.state}
            label="State / Province"
            onChange={event => onChange('billingAddress.state', event.target.value)}
            placeholder="Add a state/province"
            value={get(values, 'billingAddress.state', '') as string}
          />
        </div>
        <BasicTextInput
          autoComplete="postal-code"
          disabled={disabled}
          errors={errors.zipCode}
          label="Postal / Zip Code"
          onChange={event => onChange('billingAddress.zipCode', event.target.value)}
          placeholder="Add a postal code"
          value={get(values, 'billingAddress.zipCode', '') as string}
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

BillingInfoForm.propTypes = {
  selected: PropTypes.bool,
  user: PropTypes.shape({
    billingAddress: PropTypes.shape({
      city: PropTypes.string,
      postalCode: PropTypes.string,
      state: PropTypes.string,
      streetAddress: PropTypes.string
    })
  })
}

export default BillingInfoForm
