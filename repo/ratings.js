/**
 * Add update and get beer ratings and comments
 */

import { client as dynamodb, BadRequestError } from './config'
import uuid from 'uuid'

export default class RatingsRepo {
    constructor(ratingsTableName = process.env.RATINGS_TABLE) {
        this.ratingsTableName = ratingsTableName
    }

    async getRating(beerId) {
        if (typeof beerId !== 'number') {
            throw new BadRequestError('beerId is invalid')
        }

        const params = {
            TableName: this.ratingsTableName,
            IndexName: 'beer-index',
            KeyConditionExpression: 'beerId = :beerId',
            ExpressionAttributeValues: {
                ':beerId': beerId,
            },
        }

        const response = await dynamodb.query(params).promise()
        return response.Items
    }

    async addRating(beerId, rating, comment = '') {
        if (typeof beerId !== 'number') {
            throw new BadRequestError('beerId is invalid')
        }

        if (typeof rating !== 'number') {
            throw new BadRequestError('rating is invalid')
        }

        if (typeof comment !== 'string') {
            throw new BadRequestError('comment is invalid')
        }

        const params = {
            TableName: this.ratingsTableName,
            Item: {
                id: uuid.v1(),
                beerId,
                rating,
                comment,
            },
        }

        const response = await dynamodb.put(params).promise()
        return response
    }
}
