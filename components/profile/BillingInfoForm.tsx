import get from 'lodash.get'
import PropTypes from 'prop-types'
import set from 'lodash.set'
import { FormEvent, useEffect, useState } from 'react'
import BasicTextInput from './BasicTextInput'
import EditIcon from '../icons/Edit'
import styles from './Accordion.module.css'
import { SubmitButton } from '../buttons'

interface Billing {
  city?: string;
  state?: string;
  streetAddress?: string;
  zipCode?: string;
}

interface BillingInfoFormProps {
  billing: Billing;
}

const BillingInfoForm = ({ billing }: BillingInfoFormProps): JSX.Element => {
  const [disabled, setDisabled] = useState(true)
  const [values, setValues] = useState({})

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

  useEffect(() => {
    setValues(billing)
  }, [billing])

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
          label="Street Address"
          onChange={event => onChange('billingAddress.streetAddress', event.target.value)}
          placeholder="Add a street address"
          value={get(values, 'billingAddress.streetAddress', '') as string}
        />
        <div className={styles.address_block}>
          <BasicTextInput
            autoComplete="address-level2"
            disabled={disabled}
            label="City"
            onChange={event => onChange('billingAddress.city', event.target.value)}
            placeholder="Add a city"
            value={get(values, 'billingAddress.city', '') as string}
          />
          <BasicTextInput
            autoComplete="address-level1"
            disabled={disabled}
            label="State / Province"
            onChange={event => onChange('billingAddress.state', event.target.value)}
            placeholder="Add a state/province"
            value={get(values, 'billingAddress.state', '') as string}
          />
        </div>
        <BasicTextInput
          autoComplete="postal-code"
          disabled={disabled}
          label="Postal / Zip Code"
          onChange={event => onChange('billingAddress.zipCode', event.target.value)}
          placeholder="Add a postal code"
          value={get(values, 'billingAddress.zipCode', '') as string}
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

BillingInfoForm.propTypes = {
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
