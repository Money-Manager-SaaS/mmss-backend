const ormconfig =  require('./ormconfig-json');

if (process.env.JEST_TESTING === 'true') {
  // only run when testing
  console.log('using test db');
  Object.assign(ormconfig, {
    type: "sqlite",
    database: "test.sqlite",
    synchronize: false,
    logging: false,
  });
} else if (process.env.NODE_ENV === 'production') {
  // in production
  console.log('using psql db');
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
} else {
  console.log('using local dev db');
}

module.exports = ormconfig;
