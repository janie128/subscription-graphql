import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql'

const MemberType = new GraphQLObjectType({
  name: 'Member',
  description: 'A member with first and last name',
  fields: {
    id: {
      type: GraphQLID
    },
    firstName: {
      type: GraphQLString
    },
    lastName: {
      type: GraphQLString
    }
  }
})

export default MemberType
