
const database = require('../config/mysql');
const {isDelete} = require('../utils/const');
const configMysql = require('../config/mysql.config')
const mysql = require('mysql2/promise');

const getRoom = async (request, response) => {
    console.log("getRoom")
    response.render('Room', {title : 'Room Information'});
}
const postRoom = async (request, response) => {
	console.log("postRoom");
	try {
		const {roomname, roomtype,  description} = request.body;	
		var query = `
		INSERT INTO Rooms 
		(roomname, roomtype,  description) 
		VALUES ('${roomname}', '${roomtype}', '${description}') `;
		const pool = mysql.createPool(configMysql);
		const room = await pool.query(query);
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
const putRoomById = async (request, response) => {
	console.log("putRoomById");
	try {
		const {id, roomname, roomtype,  description} = request.body;	
        console.log(request.body);
		var query = `
		UPDATE Rooms 
		SET roomname = "${roomname}", 
		roomtype = "${roomtype}",   
		description = "${description}" 
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
const deleteRoomById = async (request, response) => {
	console.log("deleteRoomById");
	try {
		var {id} = request.body;

        var query = `
		UPDATE Rooms 
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

const getRoomById = async (request, response) => {
	console.log("getRoomById");
	try {
		const {id} = request.params;

		var query = `SELECT * FROM Rooms WHERE id = "${id}"`;
		const pool = mysql.createPool(configMysql);
		const room = await pool.query(query);
		console.log("ROOM === > ", room[0][0])
		response.json({
			data: room[0][0],
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

const getAllRoom = async (request, response) => {
    console.log("getAllRoom ::::")
    
	
    try {
        var queryRooms = `SELECT main.id, main.roomname, roo.price AS price, main.description,
			 roo.roomtypename, sta.statusname AS statusname
			FROM Rooms main LEFT JOIN Roomtypes roo on (main.roomtype = roo.id)
			LEFT JOIN Statuss sta on (main.status = sta.id)
			WHERE main.isDelete = ${isDelete.false}  ORDER BY main.id ASC`;  
			const pool = mysql.createPool(configMysql);
			const rooms = await pool.query(queryRooms);
			const roomtypes = await pool.query(`SELECT * FROM Roomtypes 
			WHERE isDelete = ${isDelete.false}  ORDER BY id ASC`);
			await pool.end();
			response.json({
				data: rooms[0],
				roomtype: roomtypes[0],
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
    getRoom,
    getAllRoom,
	getRoomById,
	postRoom,
	putRoomById,
	deleteRoomById
};

