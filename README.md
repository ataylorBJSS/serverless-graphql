# Serverless Graphql

## What is it?

A Serverless configuration to support a graphql API and dynamoDB tables.

## What does it do?

This demo allows users to retrieve data about brewdog beers from the brewdog API and store ratings and comments for each beer within dynamodb.

### Requirements

-   [Install the Serverless Framework](https://serverless.com/framework/docs/providers/aws/guide/installation/)
-   [Configure your AWS CLI](https://serverless.com/framework/docs/providers/aws/guide/credentials/)

### Usage

To run unit tests on your local

```bash
$ npm test
```

To run a function on your local

```bash
$ serverless invoke local --function hello
```

To start up dynamoDB and seed data

```bash
$ npm run startdb
```

To simulate API Gateway locally using [serverless-offline](https://github.com/dherault/serverless-offline)

```bash
$ npm run offline
```

To run serverless offline and dynamodb in the same command

```bash
$ npm run start:local
```

Run your tests

```bash
$ npm test
```

We use Jest to run our tests. You can read more about setting up your tests [here](https://facebook.github.io/jest/docs/en/getting-started.html#content).

Deploy your project

```bash
$ serverless deploy
```

Deploy a single function

```bash
$ serverless deploy function --function hello
```
