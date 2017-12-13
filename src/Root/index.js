// external import
import React from 'react'
import { QueryRenderer, graphql } from 'react-relay'
// local imports
import environment from '../relayEnv'
import MemberSection from './MemberSection'

const RootView = () => (
  <QueryRenderer
    environment={environment}
    query={graphql`
      query RootQuery {
        instance {
          ...MemberSection_instance
        }
      }
    `}
    render={({ error, props }) => {
      // if there was an error
      if (error) {
        throw new Error(error.message)
      }

      if (!props) {
        return null
      }

      return <div>
        <MemberSection instance={props.instance}/>
      </div>
    }}
  />
)

export default RootView
