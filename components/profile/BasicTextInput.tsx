import { ChangeEventHandler } from 'react'
import styles from './Accordion.module.css'

interface BasicTextInputProps {
  autoComplete: string;
  disabled: boolean;
  label: string;
  onChange: ChangeEventHandler<HTMLInputElement>
  placeholder?: string;
  value?: string;
}

const BasicTextInput = ({ autoComplete, disabled, label, onChange, placeholder, value }: BasicTextInputProps): JSX.Element => (
  <div className={styles.info_block_padding}>
    <label className={styles.info_block_label} htmlFor={`${label}-input`}>{label}</label>
    <input autoComplete={autoComplete} className={styles.info_block_value} disabled={disabled} onChange={onChange} placeholder={placeholder} type="text" value={value} />
    <span className={styles.focus_border}></span>
  </div>
)

export default BasicTextInput
