const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const sql = require('mssql/msnodesqlv8');

console.log(process.env.DB_SERVER, process.env.DB_DATABASE);

const config = {
    connectionString: `Driver={ODBC Driver 17 for SQL Server};Server=${process.env.DB_SERVER};Database=${process.env.DB_DATABASE};Trusted_Connection=Yes;`
};

const poolPromise = sql.connect(config)
    .then(pool => {
        console.log('Connected to SQL Server');
        return pool;
    })
    .catch(err => {
        console.error('Database Connection Failed! Bad Config:', err);
        throw err;
    });

module.exports = {
    sql,
    poolPromise
};
