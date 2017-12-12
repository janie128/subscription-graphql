import 'whatwg-fetch'
import { Environment, Network, RecordSource, Store } from 'relay-runtime'

const store = new Store(new RecordSource())

const network = Network.create((operation, variables) => {
  return fetch('/graphql', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  })
    .then(response => {
      // A better error message for request timeouts
      if (response.status === 504) {
        return Promise.reject({
          error: {
            message: 'Request timed out'
          }
        })
      }
      return response.json()
    })
    .then(responseJson => {
      // https://github.com/facebook/relay/issues/1816
      // https://github.com/facebook/relay/issues/1913
      if (responseJson.errors) {
        return Promise.reject(responseJson.errors[0])
      }

      return Promise.resolve(responseJson)
    })
})

const environment = new Environment({
  network,
  store,
})

export default environment
