// external imports
import { GraphQLString, GraphQLList } from 'graphql'
// local imports
import pubSub from '../../../pubSub'
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
    pubSub.publish('memberList', { memberList: theMemberList })
    return theMemberList
  }
}

export default addMember
