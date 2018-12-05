import { gql } from 'apollo-server-lambda'

module.exports = gql`
    type Beer {
        id: Int!
        name: String!
        tagline: String
        first_brewed: String
        description: String
        image_url: String
        abv: Float
        ibu: Float
        target_fg: Float
        target_og: Float
        ebc: Float
        srm: Float
        ph: Float
        attenuation_level: Float
        volume: Amount
        boil_volume: Amount
        method: Method
        ingredients: Ingredients
        food_pairing: [String]
        brewers_tips: String
        contributed_by: String
        ratings: Ratings
    }

    type Ratings {
        total: RatingTotal
        rating: [Rating]
    }

    type RatingTotal {
        average: Float
        count: Int
    }

    type Rating {
        id: ID!
        beerId: Int
        rating: Int
        comment: String
    }

    type Method {
        mash_temp: [MashTemp]
        fermentation: Temp
        twist: String
    }

    type MashTemp {
        temp: Amount
        duration: Int
    }

    type Temp {
        temp: Amount
    }

    type Ingredients {
        malt: [Malt]
        hops: [Hop]
        yeast: String
    }
    type Malt {
        name: String
        amount: Amount
    }

    type Hop {
        name: String
        amount: Amount
        add: String
        attribute: String
    }

    type Amount {
        value: Float
        unit: String
    }

    type Query {
        beers: [Beer]
        beer(id: Int!): Beer
    }

    input RatingParameters {
        beerId: Int!
        rating: Int!
        comment: String
    }

    type Mutation {
        addRating(parameters: RatingParameters): Boolean!
    }
`
