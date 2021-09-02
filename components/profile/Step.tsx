import ArrowIcon from '../icons/Arrow'
import PropTypes from 'prop-types'
import styles from './Accordion.module.css'

interface StepProps {
  children?: Array<JSX.Element> | JSX.Element;
  onSelect: (title: string) => void;
  selected: string;
  title: string;
}

const Step = ({ children, onSelect, selected, title }: StepProps): JSX.Element => (
  <nav className={styles.drop_down_menu}>
    <input type="checkbox" className={styles.activate} id={`${title}-step`} name={`${title}-step`} onChange={() => onSelect(title)} checked={title === selected} />
    <label htmlFor={`${title}-step`} className={styles.menu_title}>{title}</label>
    <div className={styles.title_arrow_icon}>
      <ArrowIcon />
    </div>
    <div className={styles.drop_down}>
      {children}
    </div>
  </nav>
)

Step.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  onSelect: PropTypes.func,
  selected: PropTypes.string,
  title: PropTypes.string
}

export default Step
