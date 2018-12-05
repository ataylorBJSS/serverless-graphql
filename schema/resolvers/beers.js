import fetch from 'node-fetch'
import { ApolloError } from 'apollo-server-lambda'
import RatingsRepo from '../../repo/ratings'
const { API_URL } = process.env

const fetchRating = async beers => {
    const repo = new RatingsRepo()
    return beers.map(async beer => {
        let rating
        try {
            rating = await repo.getRating(beer.id)
        } catch (err) {
            console.log('err', err)
        }

        const total = await rating.reduce((acc, curr) => (acc += curr.rating), 0)

        return {
            ...beer,
            ratings: {
                total: {
                    average: total / rating.length,
                    count: rating.length,
                },
                rating,
            },
        }
    })
}

module.exports = {
    Mutation: {
        addRating: async (...args) => {
            console.log('args', args)
            const repo = new RatingsRepo()
            const { beerId, rating, comment = '' } = args[1].parameters
            try {
                const result = await repo.addRating(beerId, rating, comment)
                return true
            } catch (err) {
                return false
            }
        },
    },
    Query: {
        beers: async () => {
            try {
                const beers = await fetch(API_URL)
                const results = await beers.json()
                const withRatings = await fetchRating(results)
                return withRatings
            } catch (err) {
                throw new ApolloError(err)
            }
        },
        beer: async (...args) => {
            try {
                const beer = await fetch(`${API_URL}/${args[1].id}`)
                const results = await beer.json()
                const withRatings = await fetchRating(results)
                return withRatings[0]
            } catch (err) {
                throw new ApolloError(err)
            }
        },
    },
}
