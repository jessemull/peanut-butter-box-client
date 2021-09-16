import PropTypes from 'prop-types'
import { ChangeEventHandler } from 'react'
import styles from './Checkbox.module.css'

interface CheckboxProps {
  checked?: boolean;
  disabled?: boolean;
  id: string;
  label: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: string;
}

const Checkbox = ({ checked, disabled, id, label, onChange, value }: CheckboxProps): JSX.Element => {
  const containerStyles = disabled ? `${styles.container} ${styles.notAllowed}` : styles.container
  const checkboxStyles = disabled ? `${styles.checkbox} ${styles.notAllowed}` : styles.checkbox
  const labelStyles = disabled ? `${styles.label} ${styles.notAllowed}` : styles.label
  return (
    <div className={containerStyles}>
      <input className={checkboxStyles} disabled={disabled} id={id} onChange={onChange} type="checkbox" checked={checked} value={value} />
      <label className={labelStyles} id={`label-${id}`} htmlFor={id}>{label}</label>
    </div>
  )
}

Checkbox.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string
}

export default Checkbox
