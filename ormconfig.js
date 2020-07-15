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
}

module.exports = ormconfig;
