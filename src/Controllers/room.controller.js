
const {isDelete, statusBook , statusRoom, rowInPage, rowRoomPage} = require('../utils/const');
const configMysql = require('../config/mysql.config')
const mysql = require('mysql2/promise');
const {verifiedToken, verifiedTokenByStaff} = require('../Helpers/validateToken.helper')

const getRoom = async (request, response) => {

    response.render('Room', {title : 'Rooms', role:'admin'});
}

const getRoomByIdFromTo = async (request, response) =>{

	try {
		const {id, rowinpage, search} = request.params;
			
			var querySearch = ``;
			if(search !== "") {
				querySearch = ` AND bra.branchname LIKE '%${search}%' `;
			}
			var queryRoom = `SELECT 
			main.id, main.roomname, roo.price AS price, main.description,
			roo.roomtypename, roo.price, main.status, 
			sta.statusname AS statusname, roo.maxcustomer ,
			bra.branchname
			FROM Rooms main 
			LEFT JOIN Roomtypes roo on (main.roomtype = roo.id)
			LEFT JOIN Statuss sta on (main.status = sta.id)		
			LEFT JOIN Branchs bra on (main.branchtype = bra.id)	
			WHERE main.isDelete = ${isDelete.false}  `
			+ querySearch +
			`
			ORDER BY main.branchtype ASC, main.id ASC
			LIMIT ? , ?
			`; 
			const pool = mysql.createPool(configMysql);
			const rooms = await pool.query(queryRoom, [parseInt(id), parseInt(rowinpage)]);
			
			await pool.end();			
			response.json({
				rooms: rooms[0],
				success: true
			});
			
		
	} catch (error) {

		response.json({
			message: error.message,
			success: false
		})
	}
}
const getRoomByIdFromToByStaff = async (request, response) =>{

	try {
		const {id, rowinpage} = request.params;
		const branchtype = verifiedTokenByStaff(request).branchtype;

		var queryRoom = `SELECT main.id, main.roomname, roo.price AS price, 
		main.description, roo.roomtypename, roo.price, main.status, 
		sta.statusname AS statusname, roo.maxcustomer, bra.branchname
		FROM Rooms main 
		LEFT JOIN Roomtypes roo on (main.roomtype = roo.id)
		LEFT JOIN Statuss sta on (main.status = sta.id)
		LEFT JOIN Branchs bra on (main.branchtype = bra.id)
		WHERE main.isDelete = ?  
		AND main.branchtype = ?
		ORDER BY main.id ASC
		LIMIT ? , ?
		`; 
		const pool = mysql.createPool(configMysql);
		const rooms = await pool.query(queryRoom, [isDelete.false, branchtype,parseInt(id), parseInt(rowinpage)]);
			
		await pool.end();			
		response.json({
			rooms: rooms[0],
			success: true
		});
			
		
	} catch (error) {

		response.json({
			message: error.message,
			success: false
		})
	}
}

const postRoom = async (request, response) => {

	try {

		const {roomname, roomtype,branchtype,  description} = request.body;	
		var query = `
		INSERT INTO Rooms 
		(roomname, roomtype, branchtype,  description) 
		VALUES (?, ?, ?, ?) `;
		const pool = mysql.createPool(configMysql);
		await pool.query(query, [roomname, roomtype, branchtype,  description]);
		await pool.end();
		response.json({
			message : 'Thêm mới thành công',
			success: true
		});

	} catch (error) {

		response.json({
			message: error.message,
			success: false
		})
	}
}

const postRoomByStaff = async (request, response) => {

	try {
		const branchtype = verifiedTokenByStaff(request).branchtype;

		const {roomname, roomtype,  description} = request.body;	
		var query = `
		INSERT INTO Rooms 
		(roomname, roomtype, branchtype,  description) 
		VALUES (?, ?, ?, ?) `;
		const pool = mysql.createPool(configMysql);
		await pool.query(query, [roomname, roomtype, branchtype,  description]);
		await pool.end();
		response.json({
			message : 'Thêm mới thành công',
			success: true
		});

	} catch (error) {

		response.json({
			message: error.message,
			success: false
		})
	}
}

const putRoomById = async (request, response) => {

	try {
		const {id, roomname, roomtype, branchtype,  description} = request.body;	

		var query = `
		UPDATE Rooms 
		SET roomname = ?, 
		roomtype = ?,   
		branchtype = ?,
		description = ?
		WHERE id = ?
		`;
		const pool = mysql.createPool(configMysql);
		await pool.query(query, [roomname, roomtype, branchtype,  description, id]);
		await pool.end();
		response.json({
			message : 'Sửa thành công',
			success: true
		});
		
	} catch (error) {

		response.json({
			message: error.message,
			success: false
		})
	}
}

const putRoomByStaff = async (request, response) => {

	try {
		const branchtype = verifiedTokenByStaff(request).branchtype;

		const {id, roomname, roomtype,  description} = request.body;	

		var query = `
		UPDATE Rooms 
		SET roomname = ?, 
		roomtype = ?,   
		branchtype = ?,
		description = ?
		WHERE id = ?
		`;
		const pool = mysql.createPool(configMysql);
		await pool.query(query, [roomname, roomtype, branchtype,  description, id]);
		await pool.end();
		response.json({
			message : 'Sửa thành công',
			success: true
		});
		
	} catch (error) {

		response.json({
			message: error.message,
			success: false
		})
	}
}

const deleteRoomById = async (request, response) => {

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
			message : 'Xóa thành công',
			success: true
		});
		
	} catch (error) {

		response.json({
			message: error.message,
			success: false
		})
	}
}

const deleteRoomByStaff = async (request, response) => {
	
	try {

		const branchtype = verifiedTokenByStaff(request).branchtype;

		var {id} = request.body;

        var query = `
		UPDATE Rooms 
		SET isDelete = ?
		WHERE id = ?
		AND branchtype = ?
		`;
		const pool = mysql.createPool(configMysql);
		await pool.query(query,[isDelete.false, id, branchtype]);
		await pool.end();
		response.json({
			message : 'Xóa thành công',
			success: true
		});
		
	} catch (error) {

		response.json({
			message: error.message,
			success: false
		})
	}
}

const getRoomById = async (request, response) => {

	try {
		const {id} = request.params;

		var query = `SELECT main.*, 
		rot.price, rot.roomtypename, 
		rot.maxcustomer, bra.branchname
		FROM Rooms main
		LEFT JOIN RoomTypes rot on (rot.id = main.roomtype)
		LEFT JOIN Branchs bra on (main.branchtype = bra.id)
		WHERE main.id = ? AND 
		main.isDelete = ? 
		AND rot.isDelete = ? 
		`;
		
		const queryRoomIsUse = `SELECT main.*, 
		boo.id AS bookid , boo.roomid  
		FROM Rooms main 
		LEFT JOIN Books boo ON (main.id = boo.roomid)	
		WHERE boo.isDelete = ? 
		AND main.isDelete = ? 
		AND boo.statusBook = ?
		AND main.id = ? `;
		const pool = mysql.createPool(configMysql);
		const room = await pool.query(query, [id, isDelete.false, isDelete.false]);
		var roomIsUse = await pool.query(queryRoomIsUse,[isDelete.false, isDelete.false, statusBook.CHUATHANHTOAN, id]);
		
		response.json({
			data: room[0][0],
			roomisuse: roomIsUse[0][0],
			success: true
		});
	} catch (error) {

		response.json({
			message: error.message,
			success: false
		})
	}
}
const getRoomByIdStaff = async (request, response) => {

	try {
		const {id} = request.params;
		const branchtype = verifiedTokenByStaff(request).branchtype;

		var query = `
		SELECT main.*, rot.price, rot.roomtypename,
		rot.maxcustomer 
		FROM Rooms main
		LEFT JOIN RoomTypes rot on (rot.id = main.roomtype)
		WHERE main.id = ? 
		AND main.branchtype = ?
		AND main.isDelete = ? 
		AND rot.isDelete = ? `;

		var queryRoomSucces = `
		SELECT main.*, rot.price, rot.roomtypename,
		rot.maxcustomer 
		FROM Rooms main
		LEFT JOIN RoomTypes rot on (rot.id = main.roomtype)
		WHERE main.status = ? 
		AND main.branchtype = ?
		AND main.isDelete = ? 
		AND rot.isDelete = ? `;

		const queryRoomIsUse = `
		SELECT main.*, 
		boo.id AS bookid , boo.roomid
		FROM Rooms main 
		LEFT JOIN Books boo ON (main.id = boo.roomid)	
		WHERE boo.isDelete = ? 
		AND main.branchtype = ?
		AND main.isDelete = ? 
		AND boo.statusBook = ?
		AND main.id = ? `;
		const pool = mysql.createPool(configMysql);
		const room = await pool.query(query,[id, branchtype, isDelete.false, isDelete.false]);
		var roomIsUse = await pool.query(queryRoomIsUse,[isDelete.false, branchtype, isDelete.false, statusBook.CHUATHANHTOAN, id]);
		const roomSuccess = await pool.query(queryRoomSucces,[statusRoom.SANSANG, branchtype, isDelete.false, isDelete.false] )
		await pool.end();
		response.json({
			data: room[0][0],
			roomisuse: roomIsUse[0][0],
			roomsuccess: roomSuccess[0],
			success: true
		});
	} catch (error) {

		response.json({
			message: error.message,
			success: false
		})
	}
}

const searchRoom = async (request, response) => {
	
	try {
		const {search} = request.body;
		var searchWith = '';
		if(search !== '') {
			searchWith = ` AND bra.branchname LIKE '%${search}%'   `;
		}
		console.log(search)
		
		var query = `SELECT main.*, 
		rot.price, rot.roomtypename, 
		rot.maxcustomer, sta.statusname,
		bra.branchname
		FROM Rooms main
		LEFT JOIN RoomTypes rot on (rot.id = main.roomtype)
		LEFT JOIN Statuss sta on (main.status = sta.id)
		LEFT JOIN Branchs bra on (main.branchtype = bra.id)
		WHERE  main.isDelete = ?
		AND rot.isDelete = ? 
		`;
		
		const pool = mysql.createPool(configMysql);
		const room = await pool.query(query + searchWith, [isDelete.false, isDelete.false]);
		
		await pool.end();

		response.json({
			data: room[0],
			success: true, 
			rowInPage: rowInPage
		});
	} catch (error) {

		response.json({
			message: error.message,
			success: false
		})
	}
}

const searchRoomByStaff = async (request, response) => {
	
	try {
		const branchtype = verifiedTokenByStaff(request).branchtype;
		
		const {search} = request.body;

		var searchWith = '';
		if(search !== '') {
			searchWith = ` AND main.roomname LIKE '%${search}%'  `;
		}
		var query = `SELECT main.*, rot.price, rot.roomtypename, 
		rot.maxcustomer, sta.statusname
		FROM Rooms main
		LEFT JOIN RoomTypes rot on (rot.id = main.roomtype)
		LEFT JOIN Statuss sta on (main.status = sta.id)
		WHERE  main.isDelete = ? 
		AND rot.isDelete = ? 
		AND main.branchtype = ?
		` + searchWith;
		
		const pool = mysql.createPool(configMysql);
		const room = await pool.query(query, [isDelete.false, isDelete.false, branchtype]);
		await pool.end();

		response.json({
			data: room[0],
			success: true, 
			rowInPage: rowInPage
		});
	} catch (error) {

		response.json({
			message: error.message,
			success: false
		})
	}
}

const getAllRoom = async (request, response) => {

	
    try {
        var queryRooms = `SELECT main.id, main.roomname,main.branchtype, 
		roo.price AS price, main.description,
		roo.roomtypename, bra.branchname, roo.price, 
		main.status, sta.statusname AS statusname, roo.maxcustomer
		FROM Rooms main 
		LEFT JOIN Roomtypes roo on (main.roomtype = roo.id)
		LEFT JOIN Statuss sta on (main.status = sta.id)
		LEFT JOIN branchs bra on (main.branchtype = bra.id)
		WHERE main.isDelete = ${isDelete.false}  
		ORDER BY main.branchtype ASC, main.id ASC
		`; 		
		
		var queryBranch = `SELECT * 
		FROM Branchs
		WHERE isDelete = ?
		`
		
		const pool = mysql.createPool(configMysql);
		const rooms = await pool.query(queryRooms);
		const branchs = await pool.query(queryBranch,[isDelete.false]);
		var roomtypes = await pool.query(`SELECT * FROM Roomtypes 
			WHERE isDelete = ${isDelete.false}  ORDER BY id ASC`);
		
		await pool.end();
		

		
		response.json({
			data: rooms[0],
			roomtype: roomtypes[0],
			branchs: branchs[0],
			success: true, 
			rowInPage: rowInPage,
			rowRoomPage: rowRoomPage
		});
			

    } catch (error) {

		response.json({
			message: error.message,
			success: false
		})
    }	
}
const getAllRoomByStaff = async (request, response) => {

	
    try {
		const branchtype = verifiedTokenByStaff(request).branchtype;

        var queryRooms = `SELECT main.id, main.roomname, 
		roo.price AS price, main.description,
		roo.roomtypename, roo.price, main.status, 
		sta.statusname AS statusname, roo.maxcustomer,
		bra.branchname
		FROM Rooms main 
		LEFT JOIN Roomtypes roo on (main.roomtype = roo.id)
		LEFT JOIN Statuss sta on (main.status = sta.id)	
		LEFT JOIN Branchs bra on (main.branchtype = bra.id)		
		WHERE main.isDelete = ?
		AND main.branchtype = ?
		ORDER BY main.id ASC
		`; 
		var queryRoomISUse = `SELECT main.id, main.roomname, 
		roo.price AS price, main.description,
		roo.roomtypename, roo.price, main.status, 
		sta.statusname AS statusname, roo.maxcustomer,
		bra.branchname
		FROM Rooms main 
		LEFT JOIN Roomtypes roo on (main.roomtype = roo.id)
		LEFT JOIN Statuss sta on (main.status = sta.id)	
		LEFT JOIN Branchs bra on (main.branchtype = bra.id)		
		WHERE main.isDelete = ?
		AND main.status = ?
		AND main.branchtype = ?
		ORDER BY main.id ASC
		`;	
		
		const pool = mysql.createPool(configMysql);
		const rooms = await pool.query(queryRooms, [isDelete.false, branchtype]);
		const roomisuse = await pool.query(queryRoomISUse,[isDelete.false, statusRoom.SANSANG, branchtype])

		var roomtypes = await pool.query(`SELECT * 
		FROM Roomtypes 
		WHERE isDelete = ${isDelete.false}  
		ORDER BY id ASC`);
		
		await pool.end();
		

		
		response.json({
			data: rooms[0],
			roomtype: roomtypes[0],
			roomisuse: roomisuse[0],
			success: true, 
			rowInPage: rowInPage,
			rowRoomPage: rowRoomPage
		});
			

    } catch (error) {

		response.json({
			message: error.message,
			success: false
		})
    }	
}
module.exports = {
    getRoom,
    getAllRoom,
	getAllRoomByStaff,
	getRoomById,
	postRoom,
	putRoomById,
	deleteRoomById,
	getRoomByIdFromTo,
	getRoomByIdFromToByStaff,
	searchRoom,
	searchRoomByStaff,
	getRoomByIdStaff,
	deleteRoomByStaff, 
	postRoomByStaff, 
	putRoomByStaff
};

