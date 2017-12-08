import { GraphQLObjectType, GraphQLString } from 'graphql'

const MemberType = new GraphQLObjectType({
  name: 'Member',
  description: 'A member with first and last name',
  fields: {
    firstName: {
      type: GraphQLString
    },
    lastName: {
      type: GraphQLString
    }
  }
})

export default MemberType
