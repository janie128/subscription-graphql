// In memory data
const theMemberList = [
  { id: Date.now(), firstName: 'First', lastName: 'User' }
]

export const getMemberList = () => theMemberList

export const getMember = memberId => theMemberList.find(({ id }) => id === memberId)

export const addToMemberList = ({ firstName, lastName }) => {
  const newMember = { id: Date.now(), firstName, lastName }
  theMemberList.push(newMember)
  return newMember
}

// -----------------------

const theMessageList = []

export const getMessageList = idFilter => {
  if (idFilter) {
    return theMessageList.filter(({ channelID }) => channelID === idFilter)
  }
  return theMessageList
}

export const getMessage = messageId => theMessageList.find(({ id }) => id === messageId)

export const addToMessageList = ({ channelID, message }) => {
  const newMessage = { id: Date.now(), channelID, message }
  theMessageList.push(newMessage)
  return newMessage
}
