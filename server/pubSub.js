import { RedisPubSub } from 'graphql-redis-subscriptions'
import Redis from 'ioredis'

let pubSub

const options = {
  host: 'redis',
  port: 6379,
  retry_strategy: options => {
    // reconnect after
    return Math.max(options.attempt * 100, 3000);
  }
}

// process.env.BUILD will be set to "true" when building schema
// Will only attempt to connect to Redis when NOT building schema
if (!process.env.BUILD) {
  pubSub = new RedisPubSub({
    publisher: new Redis(options),
    subscriber: new Redis(options)
  })
}

export default pubSub
