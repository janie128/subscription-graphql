// external imports
import express from 'express'
import bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
// local imports
import schema from './modules/api/schema'

// our application
const app = express()

app.get('/', (req, res) => res.send('hello world'))

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

app.listen(4000, () => console.log('server now listening at :4000'))
