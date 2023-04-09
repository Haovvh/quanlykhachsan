require('dotenv').config()

const sqlserver = {
    user: process.env.DB_ID,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    
    options: {
      trustServerCertificate: true,
      trustedconnection: true,
      enableArithAbort: true,
      instancename: "SQLEXPRESS",
    },
    port: 1433,
    
  };
   


  module.exports = sqlserver;