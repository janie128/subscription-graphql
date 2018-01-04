# Subscriptions with GraphQL + Relay

### Starting the App
#### Docker image
Before starting app, run `make dev-image` to build docker image for app.  
Any time there is a change in dependencies, image will need to be rebuilt.  
Code changes do not require rebuild as code is volume mounted to docker containers.

#### Running servers in docker containers
To start 2 servers with the Redis server: `make up`.  
Servers will be running at port `4000` and `4001`, `graphiql` will be available at both ports for the respective servers.  
Currently, server does not restart with server-side changes.  
To shutdown servers: `make down`

#### Running local client
To start dev client: `yarn start`. App will be running at port `3000`.  
*Note: There is no load balancer so client only talks to one server, namely the one at port `4000`.  
To trigger graphql operations to the other server, use the graphiql interface at port `4001`.  
Run relay compiler in watch mode while making client side changes: `npm run relay -- --watch`  

### Other useful commands
Build graphql schema: `npm run build:schema`  
Run relay compiler: `npm run relay`  
Or to run both: `make build-app`  
To view server and redis logs: `make log-server1`, `make log-server2` and `make log-redis`

<br><br>

### Helpful resources on graphql subscriptions
[Tutorial: GraphQL Subscriptions on the Server](https://dev-blog.apollodata.com/tutorial-graphql-subscriptions-server-side-e51c32dc2951)  
[How to GraphQL - Subscriptions](https://www.howtographql.com/graphql-js/9-subscriptions/)  
[Apollo GraphQL Subscriptions Docs](https://www.apollographql.com/docs/graphql-subscriptions/)  


### Helpful resources on Redis
[Redis Pub/Sub: Intro Guide](http://redisgreen.net/blog/pubsub-intro/)  
[Redis Pub/Sub: Howto Guide](http://redisgreen.net/blog/pubsub-howto/)  
[GraphQL subscriptions with Redis Pub Sub](https://dev-blog.apollodata.com/graphql-subscriptions-with-redis-pub-sub-f636fc84a0c4)  

<br><br><br>

**This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).**