// external imports
import { GraphQLObjectType } from 'graphql'
// local imports
import memberList from './memberList'
import messageAdded from './messageAdded'

const subscription = new GraphQLObjectType({
  name: 'Subscription',
  fields: {
    memberList,
    messageAdded
  }
})

export default subscription
