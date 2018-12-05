'use strict'

import AWS from 'aws-sdk' // eslint-disable-line import/no-extraneous-dependencies

AWS.config.update({ region: 'eu-west-1' })

let options = {
    region: 'localhost',
    endpoint: 'http://localhost:8000',
}

export const client = new AWS.DynamoDB.DocumentClient(options)

export class BadRequestError extends Error {}
export class NotFoundError extends Error {}
