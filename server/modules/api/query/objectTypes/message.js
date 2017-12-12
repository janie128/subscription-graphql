import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql'

const MessageType = new GraphQLObjectType({
  name: 'Message',
  description: 'A message with channel ID',
  fields: {
    id: {
      type: GraphQLID
    },
    channelID: {
      type: GraphQLID
    },
    message: {
      type: GraphQLString
    }
  }
})

export default MessageType
