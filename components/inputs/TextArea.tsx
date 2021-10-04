import PropTypes from 'prop-types'
import { ChangeEventHandler } from 'react'
import styles from './TextArea.module.css'

interface TextAreaProps {
  errors?: string | Array<string>;
  id: string;
  label: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>
  placeholder?: string;
  value?: string;
}

const TextArea = ({ errors, id, label, onChange, placeholder, value }: TextAreaProps): JSX.Element => {
  const errorsArray = Array.isArray(errors) ? errors : errors && [errors]
  return (
    <div className={styles.text_area_container}>
      <label className={styles.text_area_label} htmlFor={`${id}-input`}>{label}</label>
      <textarea className={styles.text_area_input} id={`${id}-input`} onChange={onChange} placeholder={placeholder} value={value} />
      {
        errorsArray && errorsArray.length > 0 &&
        <ul className={styles.errors_list}>
          {errorsArray.map(error => <li className={styles.error} key={error}>{error}</li>)}
        </ul>
      }
    </div>
  )
}

TextArea.propTypes = {
  errors: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  id: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string
}

export default TextArea
