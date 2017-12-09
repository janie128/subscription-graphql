// external imports
import { GraphQLList } from 'graphql'
// local imports
import { MemberType } from '../query/objectTypes'
import pubSub from '../../../pubSub'

const memberList = {
  type: new GraphQLList(MemberType),
  subscribe: () => pubSub.asyncIterator('memberList')
}

export default memberList
