## Node + Express + Sequelize Quick Starter project

The goal of this project is to provide a starting base for an api node with postgres.

Features:

- Postgres user store/update/get/delete and login
- Automatic restarts _(when server code changes)_
- Logs server when requests
- handling unexpected errors
- Token based authentication
- Husky controls hooks of test and lint when run "git commit"
- Eslint configured with Google Standard
- Jest + Supertest for create tests unit and of integration for app
- # `async/await` support
  🔰 Node + Express + Sequelize Quick Starter project

---

The goal of this project is to provide a starting base for an api node with postgres.

📰Features:

- Postgres user store/update/get/delete and login
- Automatic restarts _(when server code changes)_
- Logs server when requests
- handling unexpected errors
- Token based authentication
- Husky controls hooks of test and lint when run "git commit"
- Eslint configured with Google Standard
- Jest + Supertest for create tests unit and of integration for app
- `async/await` support

## How to run

For development:

    npm run dev or yarn dev

For production:

    npm run start or yarn start

## How to run lint or test

Run lint:

    npm run lint or yarn lint

Run test:

    npm run test or yarn test

## Requirements

    Node 6+
    Postgres server

## Goals

- Structure for real application.
- Avoid duplication of code.
- Separate business rules from the control layer.
- Control unexpected errors.
- Test for application of unit and integration.
- Style guides for formatting code.

## Project structure

```
src
│   app.js          # App entry point
│   server.js       # Run aplication
│   routes.js       # Express routes
└───app
  └───controllers   # All that is required for the endpoints
  └───models        # Database models
  └───services      # All the business logic is here
  └───jobs          # Jobs definitions for agenda.js (coming soon)
  └───subscribers   # Event handlers for async task (coming soon)
└───config          # Environment variables and configuration related stuff
└───constants       # Are fixed values
└───database        # For control have of DB version, table creation, and data entry
└───middlewares     # All that is filter for controll
```

## Author

Diego Malta

<https://twitter.com/diomalta>

<https://github.com/diomalta>
