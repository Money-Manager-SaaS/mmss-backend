const ormconfig =  require('./ormconfig-json');
const dotenv = require('dotenv');
dotenv.config();

if (process.env.JEST_TESTING === 'true') {
  // only run when testing
  Object.assign(ormconfig, {
    type: "sqlite",
    database: "test.sqlite",
    synchronize: false,
    logging: false,
  });
  console.log('using test db ', ormconfig.database);
} else if (process.env.NODE_ENV === 'production') {
  // in production
  Object.assign(ormconfig, {
    type: "postgres",
    url: process.env.DATABASE_URL,
    synchronize: true,
    logging: false,
    ssl: true
  });
  // do not use psql db for runing unit testing, it will get a lot duplication error
  console.log('using psql db ', ormconfig.url );
} else {
  console.log('using local dev db ', ormconfig.database);
}

module.exports = ormconfig;
