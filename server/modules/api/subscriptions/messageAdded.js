// external imports
import { withFilter } from 'graphql-subscriptions'
import { GraphQLID, GraphQLNonNull } from 'graphql'
// local imports
import { MessageType } from '../query/objectTypes'
import pubSub from '../../../pubSub'

const messageAdded = {
  type: MessageType,
  args: {
    channelID: {
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  subscribe: withFilter(
    () => pubSub.asyncIterator('messageAdded'),
    (payload, variables) => {
      return payload.messageAdded.channelID === variables.channelID
    }
  )
}

export default messageAdded
