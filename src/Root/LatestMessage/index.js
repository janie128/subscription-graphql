// external imports
import PropTypes from 'prop-types'
import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay'
// local imports
import styles from './styles'
import messageAddedSubscription from '../../subscriptions/messageAdded'

class LatestMessage extends React.Component {
  state = {
    latestMessage: '',
    channel: 1,
  }

  // Subscription based on a channel id
  subscribe = channelID => messageAddedSubscription({ channelID }, {
    onCompleted: () => console.log('Successful messageAddedSubscription completed'),
    onError: transaction => console.log(transaction),
    onNext: response => {
      this.setState({latestMessage: response.messageAdded.message.node.message})
    },
  })

  componentDidMount() {
    // On mount of this component, subscribe to the default channel state
    // and store the subscription
    this.subscription = this.subscribe(this.state.channel).commit()
  }

  componentWillUpdate(_, nextState) {
    const channelChanged = nextState.channel !== this.state.channel
    // Whenever the selected channel changes
    // Dispose the previous subscription and subscribe a new one with the new channel id
    if (channelChanged) {
      this.subscription.dispose()
      this.subscription = this.subscribe(nextState.channel).commit()
    }
  }

  render() {
    const activeColour = { backgroundColor: '#d8f7ff' }
    const { latestMessage, channel } = this.state

    return (
      <div style={styles.container}>
        <div style={styles.leftContainer}>
          <div style={{ marginRight: 8 }}>Latest Message:</div>
          <div>{latestMessage}</div>
        </div>
        <div style={styles.rightContainer}>
          <div style={{...styles.pill, ...(channel === 1 ? activeColour : {})}}
               onClick={() => this.setState({ channel: 1 })}
          >
            Ch 1
          </div>
          <div style={{...styles.pill, ...(channel === 2 ? activeColour : {})}}
               onClick={() => this.setState({ channel: 2 })}
          >
            Ch 2
          </div>
          <div style={{...styles.pill, ...(channel === 3 ? activeColour : {})}}
               onClick={() => this.setState({ channel: 3 })}
          >
            Ch 3
          </div>
        </div>
      </div>
    )
  }
}

LatestMessage.propTypes = {
  instance: PropTypes.object
}

export default createFragmentContainer(LatestMessage, graphql`
  fragment LatestMessage_instance on Instance {
    id
  }
`)
