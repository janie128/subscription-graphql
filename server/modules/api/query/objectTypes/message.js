// external imports
import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLNonNull } from 'graphql'
import { connectionDefinitions, globalIdField } from 'graphql-relay'
// local imports
import { nodeInterface } from '../../definitions'

export const MessageType = new GraphQLObjectType({
  name: 'Message',
  description: 'A message with channel ID',
  fields: () => ({
    id: globalIdField('Message'),
    channelID: {
      type: GraphQLID
    },
    message: {
      type: GraphQLString
    }
  }),
  interfaces: () => [nodeInterface]
})

export const { connectionType: MessageConnectionType, edgeType: MessageEdgeType } = connectionDefinitions({
  nodeType: new GraphQLNonNull(MessageType),
  name: 'Message'
})
