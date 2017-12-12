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
        members {
          firstName
          lastName
        }
      }
    `}
    render={({ error, props }) => {
      // if there was an error
      if (error) {
        throw new Error(error.message)
      }

      return <div>
        {props && props.members.map(({ firstName, lastName }, index) =>
          <div key={index}>{`${firstName} ${lastName}`}</div>)}
      </div>
    }}
  />
)

export default RootView
