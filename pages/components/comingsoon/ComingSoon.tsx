import broken from '../../../public/images/broken-peanut.jpg'

const ComingSoon = (): JSX.Element => (
  <div className="coming-soon-container">
    <div className="coming-soon-header">Coming Soon</div>
    <img alt="Coming Soon" className="coming-soon-image" src={broken} />
  </div>
)

export default ComingSoon
