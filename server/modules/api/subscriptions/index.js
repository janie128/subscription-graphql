// external imports
import { GraphQLObjectType } from 'graphql'
// local imports
import memberList from './memberList'

const subscription = new GraphQLObjectType({
  name: 'Subscription',
  fields: {
    memberList
  }
})

export default subscription
