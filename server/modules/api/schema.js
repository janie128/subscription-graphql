import { GraphQLSchema } from 'graphql'

import query from './query'
import mutation from './mutations'

export default new GraphQLSchema({
  query,
  mutation
})
