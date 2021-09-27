import PropTypes from 'prop-types'
import config from '../config'
import OrderNow from '../components/ordernow'
import Subscriptions from '../components/subscriptions'
import { api } from '../util'

const { productsUrl } = config

interface Subscription {
  description: string;
  examples: string;
  price: {
    full: {
      monthly: string;
      total: string;
    },
    half: {
      monthly: string;
      total: string;
    }
  };
  productId: string;
  title: string;
}

interface HomeProps {
  subscriptions: Array<Subscription>;
}

interface GetStaticProps {
  props: {
    subscriptions: Array<Subscription> | null;
  }
}

const Home = ({ subscriptions }: HomeProps): JSX.Element => (
  <>
    <OrderNow />
    <Subscriptions subscriptions={subscriptions} />
  </>
)

export async function getStaticProps (): Promise<GetStaticProps> {
  const data = await api.doGet<Array<Subscription>>(productsUrl) || []
  const subscriptions = data.reverse()
  return {
    props: {
      subscriptions
    }
  }
}

Home.propTypes = {
  subscriptions: PropTypes.arrayOf(PropTypes.shape({
    description: PropTypes.string,
    examples: PropTypes.string,
    price: PropTypes.shape({
      full: PropTypes.shape({
        monthly: PropTypes.number,
        total: PropTypes.number
      }),
      half: PropTypes.shape({
        monthly: PropTypes.number,
        total: PropTypes.number
      })
    }),
    productId: PropTypes.string,
    title: PropTypes.string
  }))
}
export default Home
