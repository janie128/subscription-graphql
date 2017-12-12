// external imports
import { GraphQLObjectType, GraphQLList, GraphQLID } from 'graphql'
// local imports
import { MemberType, MessageType } from './objectTypes'
import { getMessageList, getMemberList } from './memoryDb'

const query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    members: {
      name: 'Members',
      type: new GraphQLList(MemberType),
      description: 'A list of members',
      resolve: getMemberList
    },
    messages: {
      name: 'Messages',
      type: new GraphQLList(MessageType),
      args: {
        channelID: {
          type: GraphQLID
        }
      },
      resolve: (_, { channelID: idFilter }) => getMessageList(idFilter)
    }
  }
})

export default query
