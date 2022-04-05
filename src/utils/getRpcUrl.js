
import sample from 'lodash/sample'
import config from '../config'

export const nodes = [config.RPC_URL_1, config.RPC_URL_2, config.RPC_URL_3]

const getNodeUrl = () => {
  return sample(nodes)
}

export default getNodeUrl

