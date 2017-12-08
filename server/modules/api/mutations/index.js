// external imports
import { GraphQLObjectType } from 'graphql'
// local imports
import addMember from './addMember'

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addMember
  }
})

export default mutation
