// external imports
import { GraphQLString, GraphQLNonNull } from 'graphql'
import { mutationWithClientMutationId, offsetToCursor } from 'graphql-relay'
// local imports
import pubSub from '../../../pubSub'
import { addToMemberList } from '../query/memoryDb'
import { MemberEdgeType } from '../query/objectTypes'

const addMember = mutationWithClientMutationId({
  name: 'AddMember',
  description: 'Adding a new member to the instance. ID will be auto generated based on time',
  inputFields: {
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    lastName: { type: new GraphQLNonNull(GraphQLString) }
  },
  outputFields: {
    member: {
      type: MemberEdgeType,
      resolve: ({ member }) => {
        return ({
          cursor: offsetToCursor(member.id),
          node: member
        })
      }
    }
  },
  mutateAndGetPayload: ({ firstName, lastName }) => {
    const newMember = addToMemberList({ firstName, lastName })
    pubSub.publish('memberAdded', { memberAdded: newMember })
    return { member: newMember }
  }
})

export default addMember
