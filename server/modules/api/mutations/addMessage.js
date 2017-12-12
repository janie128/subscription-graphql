// external imports
import { GraphQLString, GraphQLList, GraphQLID, GraphQLNonNull } from 'graphql'
// local imports
import pubSub from '../../../pubSub'
import { addToMessageList, getMessageList } from '../query/memoryDb'
import { MessageType } from '../query/objectTypes'

const addMessage = {
  type: new GraphQLList(MessageType),
  args: {
    channelID: { type: new GraphQLNonNull(GraphQLID) },
    message: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve: (_, { channelID, message }) => {
    const newMessage = addToMessageList({ channelID, message })
    pubSub.publish('messageAdded', { messageAdded: newMessage })
    return getMessageList()
  }
}

export default addMessage
