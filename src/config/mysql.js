const mysql = require('mysql');

var connection = mysql.createConnection({
	host: process.env.DB_SERVER || 'localhost' ,
    user: process.env.DB_ID || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'qlkhachsan',
    connectionLimit: 10
});

connection.connect(function(error){
	if(error)
	{
		throw error;
	}
	else
	{
		console.log('MySQL Database is connected Successfully');
	}
});

module.exports = connection;