// external imports
import express from 'express'
import bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import { createServer } from 'http'
import { SubscriptionServer } from 'subscriptions-transport-ws'
import { execute, subscribe } from 'graphql'
// local imports
import schema from './modules/api/schema'

// our application
const app = express()
const port = 4000

app.get('/', (req, res) => res.send('Hello world! You are at the server port'))

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))
app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
  subscriptionsEndpoint: `ws://localhost:${port}/subscriptions`
}))

const server = createServer(app)
server.listen(port, () => {
  console.log(`server now listening at :${port}`)
  new SubscriptionServer(
    { execute, subscribe, schema },
    { server, path: '/subscriptions' }
  )
})
