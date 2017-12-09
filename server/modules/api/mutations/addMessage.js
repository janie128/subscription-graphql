// external imports
import { GraphQLString, GraphQLList, GraphQLID, GraphQLNonNull } from 'graphql'
// local imports
import pubSub from '../../../pubSub'
import { theMessageList } from '../query'
import { MessageType } from '../query/objectTypes'

const addMessage = {
  type: new GraphQLList(MessageType),
  args: {
    channelID: { type: new GraphQLNonNull(GraphQLID) },
    message: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve: (_, { channelID, message }) => {
    theMessageList.push({ channelID, message })
    pubSub.publish('messageAdded', { messageAdded: { channelID, message } })
    return theMessageList
  }
}

export default addMessage
