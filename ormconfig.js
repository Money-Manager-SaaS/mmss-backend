const ormconfig =  require('./ormconfig-json');

if (process.env.JEST_TESTING === 'true') {
  // only run when testing

  Object.assign(ormconfig, {
    type: "sqlite",
    database: "test.sqlite",
    synchronize: true,
    logging: false,
  });
}

module.exports = ormconfig;
