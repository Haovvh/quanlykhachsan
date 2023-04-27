const database = require('../config/mysql');
const { isDelete } = require('../utils/const'); 
const configMysql = require('../config/mysql.config')
const mysql = require('mysql2/promise');

const getGender = async (request, res) => {
    console.log("getGender")
    res.render('Gender', {title : 'Gender Information'});
}
const getGenderById = async (request, response) => {
    console.log("getGenderById")
    try {
		var {id} = request.params;
		//console.log(request.header())
		console.log(request.headers)
		var query = `SELECT *
		FROM Genders 
		WHERE id = "${id}"`;
		const pool = mysql.createPool(configMysql);
		const gender = await pool.query(query);
		response.json({
			data: gender[0][0], 
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

const searchGender = async (request, response) => {
    console.log("searchGender")
    try {
		var {search} = request.body;
		//console.log(request.header())
		var query = `SELECT *
		FROM Genders 
		WHERE gendername LIKE '%${id}%' AND isDelete = ${isDelete.false}`;
		const pool = mysql.createPool(configMysql);
		const gender = await pool.query(query);
		response.json({
			data: gender[0], 
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

const postGender = async (request, response) => {
    console.log("postGender")
    try {
		console.log("Body ::: ",request.body);
        const {gendername} = request.body;	
		var query = `
		INSERT INTO Genders 
		(gendername) 
		VALUES ('${gendername}') `;
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
const putGenderById = async (request, response) => {
    console.log("putGenderById")
    try {
		console.log("Edit ::: ");
		const {id, gendername} = request.body;	

		var query = `
		UPDATE Genders
		SET gendername = "${gendername}"
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
const deleteGenderById = async (request, response) => {
    console.log("deleteGenderById")
    try {
		var id = request.body.id;

        var query = `
		UPDATE Genders
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

const getAllGender = async (request, response) => {
    
	
    try {

		console.log(request.headers.Authorization)
		console.log("fetch");
			var query = `SELECT id, gendername
			FROM Genders 
			WHERE isDelete = ${isDelete.false}  ORDER BY id ASC`;  
			const pool = mysql.createPool(configMysql);
		const genders = await pool.query(query);
		await pool.end();
		response.json({
			data: genders[0],
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
    getGender,
    getAllGender,
    getGenderById,
	postGender,
	putGenderById,
	deleteGenderById,
	searchGender
};