import styles from './Progress.module.css'

const Progress = (): JSX.Element => (
  <div className={styles.lds_ring}>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
)

export default Progress
