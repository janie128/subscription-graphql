// external imports
import PropTypes from 'prop-types'
import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay'
// local imports
import styles from './styles'
import addMemberMutation from '../../mutations/addMember'

class MemberSection extends React.Component {
  state = {
    firstName: '',
    lastName: ''
  }

  addMember = () => {
    const { firstName, lastName } = this.state
    const mutation = addMemberMutation({ firstName, lastName }, {
      onSuccess: () => console.log('Successfully added member'),
      onFailure: transaction => console.log(transaction)
    })

    mutation.commit([
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
      <div style={styles.container}>
        <h3>Member info</h3>
        {instance.members.edges.map(({ node }) =>
          <div key={node.id}>{`${node.firstName} ${node.lastName}`}</div>)}
        <br />
        <h3>Add new member</h3>
        <div style={styles.newMemberContainer}>
          <div style={{ marginBottom: 8 }}>
            First name:&nbsp;
            <input style={styles.input} onChange={event => this.setState({ firstName: event.target.value })}/>
          </div>
          <div style={{ marginBottom: 8 }}>
            Last name:&nbsp;
            <input style={styles.input} onChange={event => this.setState({ lastName: event.target.value })}/>
          </div>
          <div onClick={this.addMember}
               style={styles.addButton}
          >
            Add
          </div>
        </div>
      </div>
    )
  }
}

MemberSection.props = {
  instance: PropTypes.object
}

export default createFragmentContainer(MemberSection, graphql`
  fragment MemberSection_instance on Instance {
    id
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
`)
