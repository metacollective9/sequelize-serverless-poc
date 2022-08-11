# Serverless - AWS Node.js Typescript

This project has been generated using the `aws-nodejs-typescript` template from the [Serverless framework](https://www.serverless.com/).

For detailed instructions, please refer to the [documentation](https://www.serverless.com/framework/docs/providers/aws/).


## Summary
This is a boilerplate project for the Sequlize ORM (using typescript) with lambda function using the serverless framework. 

In this project we will establish a relationships of tables as per the following ERD using the Sequelize ORM and then expose multiple REST API endpoints to access the data from these tables. We will also have some initial stub data added to the tables (only when the tables are empty)


![image description](https://appletree-fallback-image.s3.eu-west-1.amazonaws.com/mytestdb+-+public.png)

## Installation/deployment instructions

Depending on your preferred package manager, follow the instructions below to deploy your project.

> **Requirements**: NodeJS `lts/fermium (v.14.15.0)`. If you're using [nvm](https://github.com/nvm-sh/nvm), run `nvm use` to ensure you're using the same Node version in local and in your lambda's runtime.

### Using NPM

- Run `npm i` to install the project dependencies
- Run `npx sls deploy` to deploy this stack to AWS

### Using Yarn

- Run `yarn` to install the project dependencies
- Run `yarn sls deploy` to deploy this stack to AWS


### Locally

In order to test the hello function locally, run the following command:

- `npx sls offline` if you're using NPM


## Template features

### Project structure

The project code base is mainly located within the `src` folder. This folder is divided in:

- `functions` - containing code base and configuration for your lambda functions
- `db` - containing code for sequelize related models, stub data and db connections
- `util` - containing some utility codes to be used across the project
- `libs` - containing shared code base between your lambdas


### 3rd party libraries

- [@serverless/typescript](https://github.com/serverless/typescript) - provides up-to-date TypeScript definitions for your `serverless.yml` service file
- [serverless-offline](https://github.com/dherault/serverless-offline) - provides ability to run lambdas locally
- [sequelize](https://www.npmjs.com/package/sequelize) - A promise-based Node.js ORM tool for Postgres and other databases
- [sequelize](https://www.npmjs.com/package/sequelize) - A promise-based Node.js ORM tool for Postgres and other databases
