
const { isDelete } = require('../utils/const'); 
const configMysql = require('../config/mysql.config')
const mysql = require('mysql2/promise');

const getRoomType = async (request, response) => {
    console.log("getRoomType")
    response.render('RoomType', {title : 'RoomType Information'});
}

const getAllRoomType = async (request, response) => {
    
    try {
        console.log("fetch");
			var query = `SELECT id, roomtypename, price
			FROM RoomTypes 
			WHERE isDelete = ${isDelete.false}  ORDER BY id ASC`;  
			const pool = mysql.createPool(configMysql);
			roomtypes = await pool.query(query);
			pool.end();
			if(roomtypes[0].length > 0){
				response.json({
					data: roomtypes[0],
					success: true   
				})
			} 			    

	
    } catch (error) {
        console.log("Error :::", error.message);
		response.json({
			message: "Error", 
			success :false
		})
    }	
}
const getRoomTypeById = async (request, response) =>{
	try {
		var {id} = request.params;

		var query = `SELECT *
		FROM RoomTypes 
		WHERE id = "${id}" AND isDelete = ${isDelete.false} `;
		const pool = mysql.createPool(configMysql);
		const roomtype = await pool.query(query);
		pool.end();
		response.json({
			data:roomtype[0][0],
			success: true
		})
	} catch (error) {
		console.log("Error ", error.message)
		response.json({
			message:  "error",
			success: false
		})
	}
}
const postRoomType = async (request, response) =>{
	try {
		console.log("Body ::: ",request.body);
        const {roomtypename, price} = request.body;	
		var query = `
		INSERT INTO RoomTypes 
		(roomtypename, price) 
		VALUES ('${roomtypename}', ${price}) `;
		const pool = mysql.createPool(configMysql);
		const isExistRoomName = await pool.query(`SELECT * FROM RoomTypes WHERE roomtypename LIKE '%${roomtypename}%' `);
		if(isExistRoomName[0][0]) {
			pool.end();
			response.json({
				message : "Roomtypename is Exits",
				success: false
			});
			return;
		}
		await pool.query(query);
		pool.end();
		response.json({
			message : 'Data Added',
			success: true
		});
		
	} catch (error) {
		console.log("Error ", error.message)
		response.json({
			message:  error,
			success: false
		})
	}
}
const putRoomTypeById = async(request, response) =>{
	try {
		console.log("Edit ::: ");
		const {id, roomtypename, price} = request.body;	

		var query = `
		UPDATE RoomTypes
		SET roomtypename = "${roomtypename}",
		price = "${price}"
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
const deleteRoomTypeById = async(request, response) =>{
	try {
		console.log(request.body);
		const {id} = request.body;
		console.log("deleteRoomTypeById ==> ", id)
        var query = `
		UPDATE RoomTypes
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
module.exports = {
    getRoomType,
    getAllRoomType,
    getRoomTypeById,
	postRoomType,
	putRoomTypeById,
	deleteRoomTypeById
};