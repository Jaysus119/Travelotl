/*
*   DOCUMENTATION OF SCHEMA AND DB: 
*   https://github.com/CN-Kids-Next-Door/notes-doc/blob/main/sqlReadme.md
*/

const { Pool } = require('pg');

const {
  POSTGRES_USER: user,
  POSTGRES_DB: database,
  POSTGRES_PASSWORD: password,
  POSTGRES_PORT: port,
  POSTGRES_HOST: host,
  POSTGRES_MAX: max,
  POSTGRES_IDLETIMEOUTMILLIS: idleTimeoutMillis,
  POSTGRES_CONNECTIONTIMEOUTMILLIS: connectionTimeoutMillis
} = process.env;

const poolConfig = {
  user,
  database,
  password,
  port,
  host,
  max,
  idleTimeoutMillis,
  connectionTimeoutMillis
};

const pool = new Pool(poolConfig);

pool
// PER CONNECTION LOGGING
  .on('connect', 
    () => {
      console.log(`Connected to database on host ${host}:${port}`);
    }
  )
// PER CONNECTION ERROR HANDLING FOR UNEXPECTED ISSUES
  .on('error', 
    (err, client) => {
      console.error('Unexpected error on idle client', err);
      process.exit(-1); // Optionally replace with more nuanced handling
    }
  )

// HEALTH CHECK (PER 5 MIN)
setInterval(() => {
    pool.query('SELECT 1', (err, res) => {
        if (err) {
            console.error('Health check failed:', err);
        } else {
            console.log('Health check successful');
        }
    });
}, 300000);

module.exports = {
  query: (text, params, callback) => {
    const start = Date.now();
    console.log(`Starting query at ${new Date(start)}: ${text}`);
    return pool.query(text, params, (err, res) => {
        const duration = Date.now() - start;
        console.log(`Query executed in ${duration}ms`);
        callback(err, res);
    });
  }
};