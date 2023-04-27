const database = require('../config/mysql');
const { isDelete } = require('../utils/const'); 
const configMysql = require('../config/mysql.config')
const mysql = require('mysql2/promise');

const getCustomerType = async (request, res) => {
    console.log("getCustomerType")
    res.render('CustomerType', {title : 'CustomerType Information'});
}

const getCustomerTypeById = async (request, response) => {
    console.log("getCustomerTypeById")
    try {
		var {id} = request.params;

		var query = `SELECT *
		FROM CustomerTypes main
		WHERE main.id = "${id}"`;
		const pool = mysql.createPool(configMysql);
		const customertype = await pool.query(query);
		await pool.end();
		response.json({
			data: customertype[0][0],
			success: true
		});
		
		
	} catch (error) {
		console.log("Error ::: ", error.message);
		response.json({
			message: error.message,
			success: false
		})
	}
}

const searchCustomerType = async (request, response) => {
    console.log("searchCustomerType")
    try {
		var {search} = request.body;

		var query = `SELECT *
		FROM CustomerTypes main
		WHERE main.customertypename LIKE '%${id}%'`;
		const pool = mysql.createPool(configMysql);
		const customertype = await pool.query(query);
		await pool.end();
		response.json({
			data: customertype[0],
			success: true
		});
		
		
	} catch (error) {
		console.log("Error ::: ", error.message);
		response.json({
			message: error.message,
			success: false
		})
	}
}

const postCustomerType = async (request, response) => {
    console.log("postCustomerType")
    try {
		const {customertypename} = request.body;	
		var query = `
		INSERT INTO CustomerTypes 
		(customertypename) 
		VALUES ('${customertypename}') `;
		const pool = mysql.createPool(configMysql);
		await pool.query(query);
		await pool.end();
		response.json({
			message : 'Data Added',
			success: true
		});
		
	} catch (error) {
		console.log("Error ::: ", error.message);
		response.json({
			message: error.message,
			success: false
		})
	}
}
const putCustomerTypeById = async (request, response) => {
    console.log("putCustomerTypeById")
    try {
		console.log("Edit ::: ");
		const {id, customertypename} = request.body;	
		var query = `
		UPDATE CustomerTypes
		SET customertypename = "${customertypename}"
		WHERE id = "${id}"
		`;
		const pool = mysql.createPool(configMysql);
		await pool.query(query);
		await pool.end();
		response.json({
			message : 'Data Edited', 
			success: true
		});

		
	} catch (error) {
		console.log("Error ::: ", error.message);
		response.json({
			message: error.message,
			success: false
		})
	}
}
const deleteCustomerTypeById = async (request, response) => {
    console.log("deleteCustomerTypeById")
    try {
		var id = request.body.id;

        var query = `
		UPDATE CustomerTypes
		SET isDelete = ${isDelete.true}
		WHERE id = "${id}"
		`;
		const pool = mysql.createPool(configMysql);
		await pool.query(query);
		await pool.end();
		response.json({
			message : 'Data Deleted',
			success: true
		});
	} catch (error) {
		console.log("Error ::: ", error.message);
		response.json({
			message: error.message,
			success: false
		})
	}
}

const getAllCustomerType = async (request, response) => {
    console.log("CustomerType ::::::::");
    try {

		var query = `SELECT id, customertypename
			FROM CustomerTypes 
			WHERE isDelete = ${isDelete.false}  ORDER BY id ASC`;  

		const pool = mysql.createPool(configMysql);
		const customertypes = await pool.query(query);
		await pool.end();
		response.json({
			data: customertypes[0],
			success: true                 
		});				

    } catch (error) {
        console.log("Error ::: ", error.message);
		response.json({
			message: error.message,
			success: false
		})
    }

	
}
module.exports = {
    getCustomerType,
    getAllCustomerType,
    getCustomerTypeById,
	postCustomerType,
	putCustomerTypeById,
	deleteCustomerTypeById,
	searchCustomerType
};