// external imports
import { nodeDefinitions, fromGlobalId } from 'graphql-relay'
// local imports
import { getMember, Member, getMessage, Message } from '../query/memoryDb'
import { MemberType, MessageType } from '../query/objectTypes'

export const { nodeInterface, nodeField } = nodeDefinitions(
  globalId => {
    const { type, id } = fromGlobalId(globalId)
    if (type === 'Member') {
      return getMember(id)
    } else if (type === 'Message') {
      return getMessage(id)
    } else {
      return null
    }
  },
  obj => {
    if (obj instanceof Member) {
      return MemberType
    } else if (obj instanceof Message) {
      return MessageType
    } else {
      return null
    }
  }
)
