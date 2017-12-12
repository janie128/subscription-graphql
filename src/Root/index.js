// external import
import React from 'react'
import { QueryRenderer, graphql } from 'react-relay'
// local imports
import environment from '../relayEnv'

const RootView = () => (
  <QueryRenderer
    environment={environment}
    query={graphql`
      query RootQuery {
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
    `}
    render={({ error, props }) => {
      // if there was an error
      if (error) {
        throw new Error(error.message)
      }

      return <div>
        {props && props.instance.members.edges.map(({ node }) =>
          <div key={node.id}>{`${node.firstName} ${node.lastName} (${node.id})`}</div>)}
      </div>
    }}
  />
)

export default RootView
