// external imports
import { withFilter } from 'graphql-subscriptions'
import { GraphQLID, GraphQLNonNull, GraphQLObjectType } from 'graphql'
import { offsetToCursor } from 'graphql-relay'
// local imports
import { MessageEdgeType } from '../query/objectTypes'
import pubSub from '../../../pubSub'

const MessageAddedPayloadType = new GraphQLObjectType({
  name: 'MessageAddedPayload',
  fields: () => ({
    message: {
      type: MessageEdgeType,
      resolve: ({ message }) => {
        return ({
          cursor: offsetToCursor(message.id),
          node: message
        })
      }
    }
  })
})

const messageAdded = {
  type: MessageAddedPayloadType,
  args: {
    channelID: {
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  subscribe: withFilter(
    () => pubSub.asyncIterator('messageAdded'),
    (payload, variables) => {
      return payload.messageAdded.message.channelID === variables.channelID
    }
  )
}

export default messageAdded
