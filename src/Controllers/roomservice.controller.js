const configMysql = require('../config/mysql.config')
const mysql = require('mysql2/promise');
const database = require('../config/mysql');
const { isDelete } = require('../utils/const'); 

const getRoomService = async (request, res) => {
    console.log("getRoomService")
    res.render('RoomService', {title : 'RoomService Information'});
}
const postRoomService = async (request, response) => {
    try {
		console.log("postRoomService")
		const {roomservicename, price} = request.body;	
		var query = `
		INSERT INTO RoomServices 
		(roomservicename, price) 
		VALUES ('${roomservicename}', ${price}) `;
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
const putRoomServiceById = async (request, response) => {
    try {
		console.log("putRoomService")
		console.log("Edit ::: ");
		const {id, roomservicename, price} = request.body;	

		var query = `
		UPDATE RoomServices
		SET roomservicename = "${roomservicename}",
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
const deleteRoomServiceById = async (request, response) => {
    try {
		console.log("postRoomService")
		const {id}= request.body;
		var query = `
		UPDATE RoomServices
		SET isDelete = ${isDelete.true}
		WHERE id = "${id}"
		`;
		const pool = mysql.createPool(configMysql);
		await pool.query(query);
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
const getRoomServiceById = async (request, response) => {
	try {
		const {id} = request.params;
		console.log("fetchSingle")

		var query = `SELECT *
		FROM RoomServices 
		WHERE id = "${id}"`;
		const pool = mysql.createPool(configMysql);
		
		const roomService = await pool.query(query);
		response.json({
			data:roomService[0][0],
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

const getAllRoomService = async (request, response) => {
    
    try {
        console.log("fetch");
			var query = `SELECT id, roomservicename, price
			FROM RoomServices 
			WHERE isDelete = ${isDelete.false}  ORDER BY id ASC`;
		
			const pool = mysql.createPool(configMysql);
			const roomServices = await pool.query(query);
			response.json({
				data: roomServices[0],
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
    getRoomService,
    getAllRoomService,
    getRoomServiceById,
	postRoomService,
	putRoomServiceById,
	deleteRoomServiceById
};