import typeDefs from './types/queries'
import beerResolvers from './resolvers/beers'

module.exports = {
    typeDefs,
    resolvers: { ...beerResolvers },
    mocks: false,
    context: ({ event, context }) => {
        return {
            headers: event.headers,
            functionName: context.functionName,
            event,
            context,
        }
    },
}
