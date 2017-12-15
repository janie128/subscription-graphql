// external imports
import React from 'react'
// local imports
import styles from './styles'
import addMessageMutation from '../../mutations/addMessage'

class MessageStation extends React.Component {
  state = {
    message: '',
    channel: 1
  }

  addMessage = () => {
    const { message, channel } = this.state
    if (!message) {
      return null
    }

    const mutation = addMessageMutation({ message, channelID: channel }, {
      onSuccess: response => console.log('Successfully broadcasted message'),
      onFailure: transaction => console.log(transaction)
    })

    mutation.commit()
  }

  render() {
    return (
      <div style={styles.container}>
        <h2>Message Station</h2>
        <h4>A place to broadcast messages to different channels</h4>
        <div>
          <label style={styles.radioLabel}>
            <input type="radio"
                   value={1}
                   checked={1 === this.state.channel}
                   style={{ marginRight: 8 }}
                   onChange={evt => this.setState({channel: Number.parseInt(evt.target.value, 10)})}
            />
            Channel 1
          </label>
          <label style={styles.radioLabel}>
            <input type="radio"
                   value={2}
                   checked={2 === this.state.channel}
                   style={{ marginRight: 8 }}
                   onChange={evt => this.setState({channel: Number.parseInt(evt.target.value, 10)})}
            />
            Channel 2
          </label>
          <label style={styles.radioLabel}>
            <input type="radio"
                   value={3}
                   checked={3 === this.state.channel}
                   style={{ marginRight: 8 }}
                   onChange={evt => this.setState({channel: Number.parseInt(evt.target.value, 10)})}
            />
            Channel 3
          </label>
        </div>
        <textarea style={styles.input}
                  onChange={event => this.setState({ message: event.target.value })}
        />
        <div style={styles.confirm} onClick={this.addMessage}>Broadcast message</div>
      </div>
    )
  }
}

export default MessageStation
