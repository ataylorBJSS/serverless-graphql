import { ApolloServer } from 'apollo-server-lambda'
import config from './schema'

const server = new ApolloServer(config)
exports.handler = server.createHandler()
