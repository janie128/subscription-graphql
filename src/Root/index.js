// external import
import React from 'react'
import { QueryRenderer, graphql } from 'react-relay'
// local imports
import environment from '../relayEnv'
import MemberSection from './MemberSection'
import Notifications from './Notifications'
import LatestMessage from './LatestMessage'

const RootView = () => (
  <QueryRenderer
    environment={environment}
    query={graphql`
      query RootQuery {
        instance {
          ...MemberSection_instance
          ...Notifications_instance
          ...LatestMessage_instance
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
        <LatestMessage instance={props.instance}/>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <MemberSection instance={props.instance}/>
          <Notifications instance={props.instance}/>
        </div>
      </div>
    }}
  />
)

export default RootView
