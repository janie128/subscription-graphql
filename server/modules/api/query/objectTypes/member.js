// external imports
import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql'
import { connectionDefinitions, globalIdField } from 'graphql-relay'
// local imports
import { nodeInterface } from '../../definitions'

export const MemberType = new GraphQLObjectType({
  name: 'Member',
  description: 'A member with first and last name',
  fields: () => ({
    id: globalIdField('Member'),
    firstName: {
      type: GraphQLString
    },
    lastName: {
      type: GraphQLString
    }
  }),
  interfaces: () => [nodeInterface]
})

export const { connectionType: MemberConnectionType, edgeType: MemberEdgeType } = connectionDefinitions({
  nodeType: new GraphQLNonNull(MemberType),
  name: 'Member'
})
