---
marp: true
---
# Tech Update
---

# Project Structure

- ORM (less performance but secure (sql injection))
  - entity
  - migration (auto)
  - subscriber (use the built-in subscribers only)
- services
  - router
  - middleware
  - services
  - utils

---
# DB Used
- sqlite
  - local development
  - testing
- postgresql (NODE_ENV=production)

## tips
- for typeorm, change db type, db migrations will fail,
- if so, delete migrations **before you make model changes**, and re-generate migrations

---
# Authentication
- access token - 1h
- refresh token - 14 days

## benefits
- do have log-out now
- bit of safer

---

## Init processing
1. login => 2 tokens
2. get all ledgers  (let uses to pick, or cached front-end)
3. get all resources for the selected ledger

## access expired
- will receive 401, pass refresh token to get new access token
- heroku, closed each, 30 minutes, (500), recall in about 10~30 seconds

## Logout
- delete access token and refresh token

---

# Getting Started/Add new fix/feature
> full stack is necessary

- npm run ci
- copy test.sqlite.backup and paste as database.sqlite, please do not rename
  - npm run db:migrate  (if there are models change)

## Fast to go through the projects
- from router to service

## example
- add a validator

---
# Server/Platform and Deployment
- Heroku PaaS
  - postgresql
- Docker
  - dockerfile
  - heroku.yml

## example
- switch to new backend

---
# Testing
- npm run test
  - jest
  - jest setup

## Integration services
- github action
- renovate -- dependencies management
- codecov -- for code quality and coverage report

---
# Others to know
- logger, pino
  - fast
  - does not show up the logging line

---
# Todo
- validation middleware
  - all create endpoints are required
- get amount for accounts
  - use amount id to filter the transactions