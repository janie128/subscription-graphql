// external imports
import { GraphQLString, GraphQLID, GraphQLNonNull } from 'graphql'
import { mutationWithClientMutationId, offsetToCursor } from 'graphql-relay'
// local imports
import pubSub from '../../../pubSub'
import { addToMessageList } from '../query/memoryDb'
import { MessageEdgeType } from '../query/objectTypes'

const addMessage = mutationWithClientMutationId({
  name: 'AddMessage',
  description: 'Adding a new message to the instance. Must include channel ID for message',
  inputFields: {
    channelID: { type: new GraphQLNonNull(GraphQLID) },
    message: { type: new GraphQLNonNull(GraphQLString) }
  },
  outputFields: {
    message: {
      type: MessageEdgeType,
      resolve: ({ message }) => {
        return ({
          cursor: offsetToCursor(message.id),
          node: message
        })
      }
    }
  },
  mutateAndGetPayload: ({ channelID, message }) => {
    const newMessage = addToMessageList({ channelID, message })
    pubSub.publish('messageAdded', { messageAdded: newMessage })
    return { message: newMessage }
  }
})

export default addMessage
