// In memory data
export class Member {
  constructor(firstName, lastName) {
    this.id = Date.now()
    this.firstName = firstName
    this.lastName = lastName
  }
}

const theMemberList = [
  { id: Date.now(), firstName: 'First', lastName: 'User' }
]

export const getMemberList = () => theMemberList

export const getMember = memberId => theMemberList.find(({ id }) => id === memberId)

export const addToMemberList = ({ firstName, lastName }) => {
  const newMember = new Member(firstName, lastName)
  theMemberList.push(newMember)
  return newMember
}

// -----------------------
export class Message {
  constructor(channelID, message) {
    this.id = Date.now()
    this.channelID = channelID
    this.message = message
  }
}

const theMessageList = []

export const getMessageList = idFilter => {
  if (idFilter) {
    return theMessageList.filter(({ channelID }) => channelID === idFilter)
  }
  return theMessageList
}

export const getMessage = messageId => theMessageList.find(({ id }) => id === messageId)

export const addToMessageList = ({ channelID, message }) => {
  const newMessage = new Message(channelID, message)
  theMessageList.push(newMessage)
  return newMessage
}
