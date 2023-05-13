
const { isDelete , rowInPage } = require('../utils/const'); 
const configMysql = require('../config/mysql.config')
const mysql = require('mysql2/promise');
const {validateTokenRoleAdmin} = require('../Helpers/validateTokenRoleAdmin.helper')

const getRoomType = async (request, response) => {
    
    response.render('RoomType', {title : 'RoomTypes', layout: 'layout' });
}


const getAllRoomType = async (request, response) => {
    
    try {		
		var query = `SELECT *
		FROM RoomTypes 
		WHERE isDelete = ${isDelete.false}  ORDER BY id ASC`;  
		const pool = mysql.createPool(configMysql);
		roomtypes = await pool.query(query);
		pool.end();
		if(roomtypes[0].length > 0){
			console.log("sucess")
			response.json({
				data: roomtypes[0],
				success: true, 
				rowInPage: rowInPage
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

const searchRoomType = async (request, response) =>{
	try {
		const {search} = request.body

		var query = `SELECT *
		FROM RoomTypes 
		WHERE roomtypename LIKE '%${search}%' AND isDelete = ${isDelete.false} `;
		const pool = mysql.createPool(configMysql);
		const roomtype = await pool.query(query);
		pool.end();
		response.json({
			data:roomtype[0],
			success: true, 
			rowInPage: rowInPage
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
		console.log("postRoomType")
		validateTokenRoleAdmin();
        const {roomtypename, price, maxcustomer} = request.body;	
		var query = `
		INSERT INTO RoomTypes 
		(roomtypename, price ,maxcustomer) 
		VALUES (?, ?, ?) `;
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
		await pool.query(query,[roomtypename, price, maxcustomer]);
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
		validateTokenRoleAdmin();
		const {id, roomtypename, price, maxcustomer} = request.body;	

		var query = `
		UPDATE RoomTypes
		SET roomtypename = ?,
		price = ?,
		maxcustomer = ?
		WHERE id = ?
		`;
		const pool = mysql.createPool(configMysql);
		await pool.query(query,[roomtypename, price, maxcustomer, id]);
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
		validateTokenRoleAdmin();
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

const getRoomTypeByIdFromTo = async (request, response) =>{
	console.log("getRoomTypeByIdFromTo")
	try {
		const {id, rowinpage} = request.params;
		console.log("IDD == >>", id ,  "  row ===>", rowinpage)
			
			var query = `SELECT *
			FROM RoomTypes 
			WHERE isDelete = ${isDelete.false}  
			ORDER BY main.id ASC
			LIMIT ? , ?`;
			
			const pool = mysql.createPool(configMysql);
			const data = await pool.query(query, [parseInt(id), parseInt(rowinpage)]);
			
			await pool.end();			
			response.json({
				data: data[0],
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
	deleteRoomTypeById,
	searchRoomType,
	getRoomTypeByIdFromTo
};