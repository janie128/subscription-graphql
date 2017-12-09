import { GraphQLSchema } from 'graphql'

import query from './query'
import mutation from './mutations'
import subscription from './subscriptions'

export default new GraphQLSchema({
  query,
  mutation,
  subscription
})
