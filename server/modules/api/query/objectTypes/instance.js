// external imports
import { GraphQLObjectType, GraphQLID, GraphQLNonNull } from 'graphql'
import { globalIdField, connectionArgs, connectionFromArray } from 'graphql-relay'
// local imports
import { MemberConnectionType, MessageConnectionType } from './'
import { getMessageList, getMemberList } from '../memoryDb'

const InstanceType = new GraphQLObjectType({
  name: 'Instance',
  fields: () => ({
    id: globalIdField('Instance'),
    members: {
      name: 'Members',
      type: new GraphQLNonNull(MemberConnectionType),
      args: {
        ...connectionArgs
      },
      description: 'A list of members',
      resolve: (_, args) => connectionFromArray(getMemberList(), args)
    },
    messages: {
      name: 'Messages',
      type: new GraphQLNonNull(MessageConnectionType),
      args: {
        ...connectionArgs,
        channelID: {
          type: GraphQLID
        }
      },
      resolve: (_, args) => connectionFromArray(getMessageList(args.channelID), args)
    }
  })
})

export default InstanceType
