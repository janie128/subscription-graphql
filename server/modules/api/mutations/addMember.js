// external imports
import { GraphQLString, GraphQLList } from 'graphql'
// local imports
import pubSub from '../../../pubSub'
import { addToMemberList, getMemberList } from '../query/memoryDb'
import { MemberType } from '../query/objectTypes'

const addMember = {
  type: new GraphQLList(MemberType),
  args: {
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString }
  },
  resolve: (_, {firstName, lastName}) => {
    const newMember = addToMemberList({ firstName, lastName })
    pubSub.publish('memberAdded', { memberAdded: newMember })
    return getMemberList()
  }
}

export default addMember
