// external imports
import { GraphQLString, GraphQLList } from 'graphql'
// local imports
import { theMemberList } from '../query'
import { MemberType } from '../query/objectTypes'

const addMember = {
  type: new GraphQLList(MemberType),
  args: {
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString }
  },
  resolve: (_, args) => {
    theMemberList.push({ firstName: args.firstName, lastName: args.lastName })
    return theMemberList
  }
}

export default addMember
