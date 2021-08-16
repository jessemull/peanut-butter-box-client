import Appbar from './components/appbar'
import BottomNav from './components/bottom-nav'
import Header from './components/header'
import OrderNow from './components/ordernow'
import Subscriptions from './components/subscriptions'

const Home = (): JSX.Element => (
  <>
    <Header />
    <Appbar />
    <OrderNow />
    <Subscriptions />
    <BottomNav />
  </>
)

export default Home
