// external imports
import { graphql } from 'react-relay'
// local imports
import mutationFromQuery from './mutationFromQuery'

export default mutationFromQuery(graphql`
  mutation addMessageMutation($input: AddMessageInput!) {
    addMessage(input: $input) {
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
