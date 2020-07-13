const ormconfig =  require('./ormconfig-json');

if (process.env.JEST_TESTING === 'true') {
  // only run when testing

  Object.assign(ormconfig, {
    type: "sqlite",
    database: "test.sqlite",
    synchronize: false,
    logging: false,
  });
}

if (process.env.NODE_ENV === 'CI') {
  // for CI only, not use locally or in production
  Object.assign(ormconfig, {
    database: "test.sqlite.backup",
  });
}

module.exports = ormconfig;
