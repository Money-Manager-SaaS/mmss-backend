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
    host: "localhost",
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
  });
  // do not use psql db for runing unit testing, it will get a lot duplication error
  console.log('using psql db ', ormconfig.database );
} else {
  console.log('using local dev db ', ormconfig.database);
}

module.exports = ormconfig;
