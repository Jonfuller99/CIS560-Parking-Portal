require('dotenv').config();
const sql = require('mssql');

const config = {
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: process.env.DB_ENCRYPT === 'true',
        trustServerCertificate: process.env.DB_TRUST_CERT === 'true',
    },
    authentication: {
        type: 'ntlm',
        options: {
        domain: '', // can leave empty for LocalDB
        userName: '',
        password: '',
        }
    }
};

module.exports = sql.connect(config);