// external import
import React from 'react'
import PropTypes from 'prop-types'
import { QueryRenderer, graphql } from 'react-relay'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
// local imports
import environment from '../relayEnv'
import MemberSection from './MemberSection'
import Notifications from './Notifications'
import LatestMessage from './LatestMessage'
import MessageStation from './MessageStation'

const Home = ({instance}) => (
  <div>
    <LatestMessage instance={instance}/>
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <MemberSection instance={instance}/>
      <Notifications instance={instance}/>
    </div>
    <a href="/message" style={{marginLeft: 500}}>Go to message broadcast station</a>
  </div>
)

Home.propTypes = {
  instance: PropTypes.object
}

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

      return (
        <div>
          <Router>
            <Switch>
              <Route exact path="/message" render={() => <MessageStation/>}/>
              <Route exact path="/" render={() => <Home instance={props.instance}/>}/>
            </Switch>
          </Router>
        </div>
      )
    }}
  />
)

export default RootView
