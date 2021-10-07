import configDev from './config.dev'
import configLocal from './config.local'
import configProd from './config.prod'

const stage = process.env.STAGE || 'dev'

interface Config {
  cartItem: string;
  healthcheckUrl: string;
  placesUrl: string;
  productsUrl: string;
  redirectUri: string;
  supportUrl: string;
  usersUrl: string;
}

let config: Config

switch (stage) {
  case 'dev':
    config = configDev
    break
  case 'local':
    config = configLocal
    break
  case 'prod':
    config = configProd
    break
  default:
    config = configDev
    break
}

export default config
