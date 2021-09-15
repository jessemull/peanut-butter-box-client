import PropTypes from 'prop-types'
import { ChangeEventHandler } from 'react'
import styles from './BasicTextInput.module.css'

interface Suggestion {
  label: string;
  value: any; // eslint-disable-line
}
interface BasicTextInputProps {
  autoComplete: string;
  disabled?: boolean;
  errors?: string | Array<string>;
  label: string;
  onChange: ChangeEventHandler<HTMLInputElement>
  placeholder?: string;
  suggestions: Array<Suggestion>;
  type: string;
  value?: string;
}

const BasicTextInput = ({ autoComplete, disabled, errors, label, onChange, placeholder, suggestions, type, value }: BasicTextInputProps): JSX.Element => {
  const errorsArray = Array.isArray(errors) ? errors : errors && [errors]
  return (
    <div className={styles.info_block_padding}>
      <label className={styles.info_block_label} htmlFor={`${label}-input`}>{label}</label>
      <input autoComplete={autoComplete} className={styles.info_block_value} disabled={disabled} list={`${label}-list`} onChange={onChange} placeholder={placeholder} type={type} value={value} />
      <span className={styles.focus_border}></span>
      {
        suggestions.length > 0 &&
          <datalist id={`${label}-list`}>
            {suggestions.map((suggestion) => <option key={suggestion.label}>{suggestion.label}</option>)}
          </datalist>
      }
      {
        errorsArray && errorsArray.length > 0 &&
        <ul className={styles.errors_list}>
          {errorsArray.map(error => <li className={styles.error} key={error}>{error}</li>)}
        </ul>
      }
    </div>
  )
}

BasicTextInput.propTypes = {
  autoComplete: PropTypes.string,
  disabled: PropTypes.bool,
  errors: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  label: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  suggestions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.any
  })),
  type: PropTypes.string,
  value: PropTypes.string
}

BasicTextInput.defaultProps = {
  disabled: false,
  suggestions: [],
  type: 'text'
}

export default BasicTextInput
