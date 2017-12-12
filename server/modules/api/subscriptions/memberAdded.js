// local imports
import { MemberType } from '../query/objectTypes'
import pubSub from '../../../pubSub'

const memberAdded = {
  type: MemberType,
  subscribe: () => pubSub.asyncIterator('memberAdded')
}

export default memberAdded
