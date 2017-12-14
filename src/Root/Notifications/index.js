// external imports
import PropTypes from 'prop-types'
import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay'
// local imports
import memberAddedSubscription from '../../subscriptions/memberAdded'

class Notifications extends React.Component {
  state = {
    newMember: ''
  }

  componentDidMount() {
    const subscription = memberAddedSubscription({}, {
      onCompleted: () => console.log('Successful subscription completed'),
      onError: transaction => console.log(transaction),
      onNext: response => {
        this.setState({newMember: response.memberAdded.member.node.firstName})
      },
    })

    subscription.commit([
      {
        type: 'RANGE_ADD',
        parentID: this.props.instance.id,
        connectionInfo: [
          {
            key: 'Instance_members',
            rangeBehavior: 'append'
          }
        ],
        edgeName: 'member'
      }
    ])
  }

  render() {
    const { instance } = this.props
    return (
      <div style={{ padding: 20 }}>
        <h3>Notifications</h3>
        <div>
          <h4>Latest added member:</h4>
          <div>{this.state.newMember}</div>
        </div>
        <div>
          <h4>Live updating member list:</h4>
          {instance.members.edges.map(({ node }, key) =>
            <div key={key}>{`${node.firstName} ${node.lastName}`}</div>)}
        </div>
      </div>
    )
  }
}

Notifications.propTypes = {
  instance: PropTypes.object
}

export default createFragmentContainer(Notifications, graphql`
  fragment Notifications_instance on Instance {
    id
    members(first: 1000) @connection(key: "Instance_members") {
      edges {
        node {
          id
          firstName
          lastName
        }
      }
    }
  }
`)
