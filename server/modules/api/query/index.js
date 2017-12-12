// external imports
import { GraphQLObjectType } from 'graphql'
// local imports
import { InstanceType } from './objectTypes'
import { nodeField } from '../definitions'

const query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    instance: {
      type: InstanceType,
      resolve: () => ({})
    },
    node: nodeField
  }
})

export default query
