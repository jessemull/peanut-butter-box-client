import PropTypes from 'prop-types'
import { ChangeEventHandler } from 'react'
import styles from './BasicTextInput.module.css'

interface BasicTextInputProps {
  autoComplete: string;
  disabled?: boolean;
  label: string;
  onChange: ChangeEventHandler<HTMLInputElement>
  placeholder?: string;
  type: string;
  value?: string;
}

const BasicTextInput = ({ autoComplete, disabled, label, onChange, placeholder, type, value }: BasicTextInputProps): JSX.Element => (
  <div className={styles.info_block_padding}>
    <label className={styles.info_block_label} htmlFor={`${label}-input`}>{label}</label>
    <input autoComplete={autoComplete} className={styles.info_block_value} disabled={disabled} onChange={onChange} placeholder={placeholder} type={type} value={value} />
    <span className={styles.focus_border}></span>
  </div>
)

BasicTextInput.propTypes = {
  autoComplete: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string
}

BasicTextInput.defaultProps = {
  disabled: false,
  type: 'text'
}

export default BasicTextInput
