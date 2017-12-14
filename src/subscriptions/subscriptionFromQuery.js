// external imports
import { requestSubscription } from 'react-relay'
// local imports
import env from '../relayEnv'

const subscriptionFromQuery = query => (input, callbacks) => ({
  commit(configs) {
    requestSubscription(env, {
      subscription: query,
      variables: { input },
      onError: callbacks.onError,
      onCompleted: callbacks.onCompleted,
      onNext: callbacks.onNext,
      updater: callbacks.updater,
      configs
    })
  }
})

export default subscriptionFromQuery
