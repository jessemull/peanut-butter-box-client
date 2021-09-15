import Select from 'react-select'
import PropTypes from 'prop-types'
import styles from './BasicSelect.module.css'

interface Option {
  label: string;
  value: string;
}

interface BasicSelectProps {
  disabled?: boolean;
  errors?: string | Array<string>;
  id?: string;
  label: string;
  onChange?: (string) => void;
  options: Array<Option>;
  placeholder?: string;
  value?: {
    label: string;
    value: string;
  };
}

interface State {
  isDisabled: boolean;
  isSelected: boolean;
}

const customStyles = {
  container: (provided: any): any => ({
    ...provided
  }),
  control: (provided: any, state: State): any => ({
    ...provided,
    backgroundColor: 'white',
    border: 'none',
    borderBottom: state.isDisabled ? 'none' : '1px solid #CCCCCC',
    borderRadius: 0,
    boxShadow: 'none',
    height: '28px',
    minHeight: '28px',
    outline: 'none',
    '&:hover': {
      border: 'none',
      borderBottom: '1px solid #CCCCCC',
      cursor: state.isDisabled ? 'not-allowed !important' : 'pointer'
    }
  }),
  indicatorsContainer: (provided: any, state: State): any => ({
    ...provided,
    '& div': {
      color: state.isDisabled ? 'grey' : 'black',
      padding: '0px'
    },
    '& div:hover': {
      color: state.isDisabled ? 'grey' : 'black',
      padding: '0px'
    }
  }),
  indicatorSeparator: (provided: any): any => ({
    ...provided,
    display: 'none'
  }),
  option: (provided: any, state: State): any => ({
    ...provided,
    backgroundColor: state.isSelected ? '#006193' : 'white',
    color: state.isSelected ? 'white' : 'black',
    fontFamily: 'Arial',
    fontSize: '13.3333px',
    '&:hover': {
      cursor: 'pointer'
    }
  }),
  placeholder: (provided: any): any => ({
    ...provided,
    color: 'grey',
    fontFamily: 'Arial',
    fontSize: '13.3333px',
    margin: '0px'
  }),
  singleValue: (provided: any): any => ({
    ...provided,
    color: 'black',
    fontFamily: 'Arial',
    fontSize: '13.3333px',
    margin: 0,
    padding: 0
  }),
  valueContainer: (provided: any): any => ({
    ...provided,
    margin: 0,
    padding: 0
  })
}

const BasicSelect = ({ disabled, errors, id, label, onChange, options, placeholder, value }: BasicSelectProps): JSX.Element => {
  const errorsArray = Array.isArray(errors) ? errors : errors && [errors]
  const disabledStyles = disabled ? `${styles.container} ${styles.disabled}` : styles.container
  return (
    <div className={disabledStyles} id={id}>
      <div>
        <label className={styles.label} htmlFor={label}>{label}</label>
      </div>
      <Select isDisabled={disabled} isSearchable={false} options={options} onChange={onChange} placeholder={placeholder} styles={customStyles} value={value} />
      {
          errorsArray && errorsArray.length > 0 &&
          <ul className={styles.errors_list}>
            {errorsArray.map(error => <li className={styles.error} key={error}>{error}</li>)}
          </ul>
        }
    </div>
  )
}

BasicSelect.prop = {
  disabled: PropTypes.bool,
  errors: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  id: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string
  })),
  placeholder: PropTypes.string,
  value: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string
  })
}

export default BasicSelect
