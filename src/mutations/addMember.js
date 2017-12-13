// external imports
import { graphql } from 'react-relay'
// local imports
import mutationFromQuery from './mutationFromQuery'

export default mutationFromQuery(graphql`
    mutation addMemberMutation($input: AddMemberInput!) {
      addMember(input: $input) {
        member {
          node {
            firstName
            lastName
          }
        }
        instance {
          members {
            edges {
              node {
                id
                firstName
                lastName
              }
            }
          }
        }
      }
    }
`)
