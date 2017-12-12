// external imports
import { GraphQLObjectType } from 'graphql'
// local imports
import memberAdded from './memberAdded'
import messageAdded from './messageAdded'

const subscription = new GraphQLObjectType({
  name: 'Subscription',
  fields: {
    memberAdded,
    messageAdded
  }
})

export default subscription
