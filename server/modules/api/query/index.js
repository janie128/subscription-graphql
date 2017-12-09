import { GraphQLObjectType, GraphQLList, GraphQLID } from 'graphql'
import { MemberType, MessageType } from './objectTypes'

export const theMemberList = [
  { firstName: 'First', lastName: 'User' }
]

export const theMessageList = []

const query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    members: {
      name: 'Members',
      type: new GraphQLList(MemberType),
      description: 'A list of members',
      resolve: () => theMemberList
    },
    messages: {
      name: 'Messages',
      type: new GraphQLList(MessageType),
      args: {
        channelID: {
          type: GraphQLID
        }
      },
      resolve: (_, { channelID: idFilter }) => {
        if (idFilter) {
          return theMessageList.filter(
            ({ channelID }) => channelID === idFilter
          )
        }
        return theMessageList
      }
    }
  }
})

export default query
