// external imports
import { graphql } from 'react-relay'
// local imports
import subscriptionFromQuery from './subscriptionFromQuery'

export default subscriptionFromQuery(graphql`
  subscription messageAddedSubscription($channelID: ID!) {
    messageAdded(channelID: $channelID) {
      message {
        node {
          id
          channelID
          message
        }
      }
    }
  }
`)
