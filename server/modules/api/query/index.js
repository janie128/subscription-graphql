import { GraphQLObjectType, GraphQLList } from 'graphql'
import { MemberType } from './objectTypes'

export const theMemberList = [
  { firstName: 'First', lastName: 'User' }
]

const query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    members: {
      name: 'Members',
      type: new GraphQLList(MemberType),
      description: 'A list of members',
      resolve: () => theMemberList
    }
  }
})

export default query
