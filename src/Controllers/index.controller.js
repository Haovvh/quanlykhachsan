
const database = require('../config/mysql');
const {isDelete, statusBook} = require('../utils/const');
const configMysql = require('../config/mysql.config')
const mysql = require('mysql2/promise');


const index = async (request, response) => {
	console.log("get index");
	try {
		var query = `
		SELECT * FROM Customers`;
		const pool = mysql.createPool(configMysql);
		const customers = await pool.query(query);
		await pool.end();
		response.render('Index', {title:'Index', role:'all'})

	} catch (error) {
		console.log("Error ::: ", error.message);
		response.json({
			message: error.message,
			success: false
		})
	}
}

module.exports = {
    index
}