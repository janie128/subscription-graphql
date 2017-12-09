// external imports
import { GraphQLObjectType } from 'graphql'
// local imports
import addMember from './addMember'
import addMessage from './addMessage'

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addMember,
    addMessage
  }
})

export default mutation
