
import PropTypes from 'prop-types'
import { ChangeEvent, ElementType } from 'react'
import styles from './TextInput.module.css'

interface TextInputProps {
  errors?: string | Array<string>;
  Icon: ElementType;
  id: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  placeholder: string;
  type: string;
  value: string;
}

const TextInput = ({ errors, Icon, id, onChange, placeholder, type, value }: TextInputProps): JSX.Element => {
  const errorsArray = Array.isArray(errors) ? errors : errors && [errors]
  return (
    <div className={styles.form_element}>
      <div className={styles.text_input_icon}>
        <Icon />
      </div>
      <input
        className={styles.text_input}
        id={id}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        value={value}
      />
      {
        errorsArray && errorsArray.length > 0 &&
        <ul className={styles.password_errors_list}>
          {errorsArray.map(error => <li className={styles.password_error} key={error}>{error}</li>)}
        </ul>
      }
    </div>
  )
}

TextInput.propTypes = {
  errors: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string
  ]),
  Icon: PropTypes.node,
  id: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string
}

export default TextInput
