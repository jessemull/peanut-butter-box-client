
import PropTypes from 'prop-types'
import { ChangeEvent } from 'react'
import styles from './TextInput.module.css'

interface TextInputProps {
  id: string;
  label: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  type: string;
  value: string;
}

const TextInput = ({ id, label, onChange, type, value }: TextInputProps): JSX.Element => (
  <div className={styles.form_element}>
    <label className={styles.text_input_label} htmlFor={id}>{label}</label>
    <input
      className={styles.text_input}
      id={id}
      onChange={onChange}
      type={type}
      value={value}
    />
  </div>
)

TextInput.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.string,
  value: PropTypes.string
}

export default TextInput
