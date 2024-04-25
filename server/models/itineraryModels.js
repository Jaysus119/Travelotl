const { Pool } = require('pg');

const PG_URI = 'postgres://postgres.gntnoaqnwfdtykjwtdla:Aleksander%202120@aws-0-us-west-1.pooler.supabase.com:5432/postgres';

const pool = new Pool({
    connectionString: PG_URI
});

//documentation and schema of database: https://github.com/CN-Kids-Next-Door/notes-doc/blob/main/sqlReadme.md

module.exports = {
    query: (text, params, callback) => {
        console.log('executed query', text);
        return pool.query(text, params, callback);
    }
};