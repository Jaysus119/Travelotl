const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
    host: process.env.POSTGRES_HOST,
    max: process.env.POSTGRES_MAX,
    idleTimeoutMillis: process.env.POSTGRES_IDLETIMEOUTMILLIS,
    connectionTimeoutMillis: process.env.POSTGRES_CONNECTIONTIMEOUTMILLIS,
});

//documentation and schema of database: https://github.com/CN-Kids-Next-Door/notes-doc/blob/main/sqlReadme.md
pool.connect((err, client, release) => {
  if (err) {
      return console.error('Error acquiring client', err.stack);
  }
  console.log('Connected to SQL database');
  release();  // Release the client back to the pool
});


module.exports = {
    query: (text, params, callback) => {
        console.log('executed query', text);
        return pool.query(text, params, callback);
    }
};