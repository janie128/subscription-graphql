// external imports
import { GraphQLObjectType } from 'graphql'
import { offsetToCursor } from 'graphql-relay'
// local imports
import { MemberEdgeType } from '../query/objectTypes'
import pubSub from '../../../pubSub'

const MemberAddedPayloadType = new GraphQLObjectType({
  name: 'MemberAddedPayload',
  fields: () => ({
    member: {
      type: MemberEdgeType,
      resolve: ({ member }) => {
        return ({
          cursor: offsetToCursor(member.id),
          node: member
        })
      }
    }
  })
})

const memberAdded = {
  type: MemberAddedPayloadType,
  subscribe: () => pubSub.asyncIterator('memberAdded')
}

export default memberAdded
