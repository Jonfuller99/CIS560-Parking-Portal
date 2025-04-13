const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const {Sequelize} = require('sequelize');


const sql = new Sequelize({
    dialect: 'mssql',
    dialectModule: require('msnodesqlv8/lib/sequelize'),
    dialectOptions: {
        options: {
        connectionString: `Driver={ODBC Driver 17 for SQL Server};Server=${process.env.DB_SERVER};Database=${process.env.DB_DATABASE};Trusted_Connection=Yes;`,
        }
    },
    define: {
        timestamps: false
    },
    logging: false, // optional: disable SQL logging
})

sql.authenticate()
  .then(() => console.log('✅ Sequelize connected to LocalDB'))
  .catch(err => console.error('❌ Connection failed:', err));

module.exports = sql;