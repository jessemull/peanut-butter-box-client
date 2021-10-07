import EmailValidator from 'email-validator'
import get from 'lodash.get'
import set from 'lodash.set'
import { useRouter } from 'next/router'
import { FormEvent, useContext, useState } from 'react'
import config from '../../config'
import { ToastContext } from '../../providers/toast'
import { api } from '../../util'
import { SquareSubmit } from '../buttons'
import { TextArea, TextInputBox } from '../inputs'
import styles from './Form.module.css'

const { supportUrl } = config

interface Errors {
  email?: string;
  firstName?: string;
  lastName?: string;
  message?: string;
}

interface FormValues {
  email: string;
  firstName: string;
  lastName: string;
  message: string;
}

const defaultErrors = {
  email: '',
  firstName: '',
  lastName: '',
  message: ''
}

const defaultValues = {
  email: '',
  firstName: '',
  lastName: '',
  message: ''
}

const validate = (values: FormValues): Errors => {
  const errors: Errors = {}
  const isValidEmail = EmailValidator.validate(values.email)
  if (!values.firstName) {
    errors.firstName = 'Please enter a first name'
  }
  if (!values.lastName) {
    errors.lastName = 'Please enter a last name'
  }
  if (!isValidEmail) {
    errors.email = 'Please enter a valid e-mail'
  }
  if (!values.email) {
    errors.email = 'Please enter an e-mail'
  }
  if (!values.message) {
    errors.message = 'Please enter a message'
  }
  return errors
}

const Form = (): JSX.Element => {
  const router = useRouter()
  const { showToast } = useContext(ToastContext)
  const [errors, setErrors] = useState<Errors>({})
  const [loading, setLoading] = useState(false)
  const [values, setValues] = useState<FormValues>(defaultValues)

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
        await api.doPost(`${supportUrl}`, JSON.stringify({ date: new Date().toISOString(), ...values }))
        await router.push('/')
        setLoading(false)
        showToast('Thank you for your input!')
      } catch (error) {
        setLoading(false)
        showToast('Oops! Something went wrong!', true)
      }
    } else {
      setErrors({ ...validated })
    }
  }

  return (
    <div className={styles.form_container}>
      <form onSubmit={onSubmit}>
        <h3 className={styles.title}>Contact Us</h3>
        <div className={styles.input_padding}>
          <TextInputBox
            autoComplete="given-name"
            errors={errors.firstName}
            id="contact-first-name"
            label="First Name"
            onChange={event => onChange('firstName', event.target.value)}
            placeholder="Enter a first name"
            value={get(values, 'firstName', '')}
          />
        </div>
        <div className={styles.input_padding}>
          <TextInputBox
            autoComplete="family-name"
            errors={errors.lastName}
            id="contact-last-name"
            label="Last Name"
            onChange={event => onChange('lastName', event.target.value)}
            placeholder="Enter a last name"
            value={get(values, 'lastName', '')}
          />
        </div>
        <div className={styles.input_padding}>
          <TextInputBox
            autoComplete="email"
            errors={errors.email}
            id="contact-email"
            label="E-mail"
            onChange={event => onChange('email', event.target.value)}
            placeholder="Enter an e-mail address"
            value={get(values, 'email', '')}
          />
        </div>
        <TextArea
          id="contact-message"
          errors={errors.message}
          label="Message"
          onChange={event => onChange('message', event.target.value)}
          placeholder="Enter a message"
          value={get(values, 'message', '')}
        />
        <div className={styles.button_container}>
          <SquareSubmit id="contact-submit-button" loading={loading} value="Submit" />
        </div>
      </form>
    </div>
  )
}

export default Form
