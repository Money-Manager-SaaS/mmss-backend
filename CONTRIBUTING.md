# Contributing Guide
Please read through this guide before contributing. 
This guide is more for Junior Developers or Non-Developers, Ignore it if you already have
this practice guide in your blood or experted in express/typescript.

We all agree,
- No software is bug free
- No great software can be built by one person
- Tests do help improve code quality and software stability

# PR Rules
- **Always create a separated branch** when you want to build something new,
- **PR is not for debugging**, before PR created, make sure the app can be run well locally
- **At least make sure testing pass** `npm run test`

---


## Start to develop
For local development, sqlite is used for development and testing purpose, 
it is very lightweight and easy for setting up.

### Getting Started
- `npm ci`
- `npm run dev` for starting the api locally

### About Migration
-  `npm run db:migrate` for migrate db, more migration info below


## Testing
supertest is used to mock the api requests, and jest is used as the test framework.

- `npm test` please make sure test pass before PR
- you might need `npm test:db:migrate` for migrating your test db


## Migration CMD
1. Typeorm support [generating migration automaticall](https://github.com/typeorm/typeorm/blob/master/docs/migrations.md#creating-a-new-migration), by simply run `npm db:gen-migration`
2. After migration file created at `src/migrations`, you can run `npm run db:migrate`






## Deployment
- for safety, create PR to prod branch
- deployment is automatical, after merging, Continuous Deployment will be run


# Ref
- [A must read express best practice guide](https://itnext.io/production-ready-node-js-rest-apis-setup-using-typescript-postgresql-and-redis-a9525871407)
- [~~sequelize doc~~](https://sequelize.org/v5/)
- typeorm
