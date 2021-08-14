import Icons from './Icons'
import Links from './Links'

const Appbar = (): JSX.Element => (
  <>
    <div className="header" />
    <div className="app-bar">
      <div className="app-bar-links">
        <p className="app-bar-title">Peanut Butter Box</p>
        <Links />
      </div>
      <div className="app-bar-icons">
        <Icons />
      </div>
    </div>
  </>
)

export default Appbar
