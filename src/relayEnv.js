import 'whatwg-fetch'
import { Environment, Network, RecordSource, Store } from 'relay-runtime'
import { SubscriptionClient } from 'subscriptions-transport-ws'

const store = new Store(new RecordSource())

const fetchQuery = (operation, variables) => {
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
  }

const setupSubscription = (config, variables, cacheConfig, observer) => {
  const query = config.text

  const subscriptionClient = new SubscriptionClient(
    'ws://localhost:4000/subscriptions',
    {
      reconnect: true
    }
  )

  const onNext = (result) => {
    observer.onNext(result)
  }
  const onError = (error) => {
    observer.onError(error)
  }
  const onComplete = () => {
    observer.onCompleted()
  }

  const client = subscriptionClient
    .request({ query, variables })
    .subscribe(onNext, onError, onComplete)

  // Return a dispose method to be able to unsubscribe and trigger closing the socket connection
  return { dispose: () => {
    // unsubscribe and close this socket connection
    client.unsubscribe()
    subscriptionClient.close()
  }}
}

const network = Network.create(fetchQuery, setupSubscription)

const environment = new Environment({
  network,
  store,
})

export default environment
