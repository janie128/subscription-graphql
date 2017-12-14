// external imports
import { graphql } from 'react-relay'
// local imports
import subscriptionFromQuery from './subscriptionFromQuery'

export default subscriptionFromQuery(graphql`
  subscription memberAddedSubscription {
    memberAdded {
      member {
        node {
          id
          firstName
          lastName
        }
      }
    }
  }
`)
