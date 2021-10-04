import PropTypes from 'prop-types'
import { ChangeEventHandler } from 'react'
import styles from './TextInputBox.module.css'

interface TextInputBoxProps {
  autoComplete: string;
  errors?: string | Array<string>;
  id: string;
  label: string;
  onChange: ChangeEventHandler<HTMLInputElement>
  placeholder?: string;
  type: string;
  value?: string;
}

const TextInputBox = ({ autoComplete, errors, id, label, onChange, placeholder, type, value }: TextInputBoxProps): JSX.Element => {
  const errorsArray = Array.isArray(errors) ? errors : errors && [errors]
  return (
    <div className={styles.text_box_container}>
      <label className={styles.text_box_label} htmlFor={`${id}-input`}>{label}</label>
      <input autoComplete={autoComplete} className={styles.text_box_input} id={`${id}-input`} onChange={onChange} placeholder={placeholder} type={type} value={value} />
      {
        errorsArray && errorsArray.length > 0 &&
        <ul className={styles.errors_list}>
          {errorsArray.map(error => <li className={styles.error} key={error}>{error}</li>)}
        </ul>
      }
    </div>
  )
}

TextInputBox.propTypes = {
  autoComplete: PropTypes.string,
  errors: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  id: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string
}

TextInputBox.defaultProps = {
  type: 'text'
}

export default TextInputBox
