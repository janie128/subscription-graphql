// external imports
import { commitMutation } from 'react-relay'
// local imports
import env from '../relayEnv'

const mutationFromQuery = query => (input, callbacks) => ({
  commit(configs) {
    commitMutation(env, {
      mutation: query,
      variables: { input },
      onError: callbacks.onFailure,
      onCompleted: callbacks.onSuccess,
      updater: callbacks.updater,
      optimisticUpdater: callbacks.optimisticUpdater,
      uploadables: callbacks.uploadables,
      configs
    })
  }
})

export default mutationFromQuery
