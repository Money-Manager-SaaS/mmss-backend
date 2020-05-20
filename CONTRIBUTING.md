# Development
- [A must read express best practice guide](https://itnext.io/production-ready-node-js-rest-apis-setup-using-typescript-postgresql-and-redis-a9525871407)
- [sequelize doc](https://sequelize.org/v5/)

- based on master, create new feature branch
- create pull request from your feature branch to master



## Migration CMD
- migrate your local sqlite db, `npm run seed`
  - this will automatically run during deployment


## stacks
- express
- sequelize for orm


# play around endpoints

### transaction
- `curl -X GET http://localhost:3000/api/v1/transactions/`
- `curl -X GET http://localhost:3000/api/v1/transactions/1`

### account
- `curl -X GET http://localhost:3000/api/v1/accounts/`
- `curl -X GET http://localhost:3000/api/v1/accounts/1`

### categories
- `curl -X GET http://localhost:3000/api/v1/categories/`
- `curl -X GET http://localhost:3000/api/v1/categories/1`

### users
- `curl -X GET http://localhost:3000/api/v1/users/`
- `curl -X GET http://localhost:3000/api/v1/users/1`

### payees
- `curl -X GET http://localhost:3000/api/v1/payees/`
- `curl -X GET http://localhost:3000/api/v1/payees/1`

### ledgers
- `curl -X GET http://localhost:3000/api/v1/ledgers/`
- `curl -X GET http://localhost:3000/api/v1/ledgers/1`






# Deployment
- deployment is automatical, after merging, Continuous Deployment will be run



