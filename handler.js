'use strict';

const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DB_URL,
});

const { init, collectData } = require('./db/postgresql');
init(pool);

module.exports.collect = async event => {
    const data = JSON.parse(event.body);

    await collectData(pool, data);

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Data collected!',
      },
      null,
      2
    ),
  };
};
