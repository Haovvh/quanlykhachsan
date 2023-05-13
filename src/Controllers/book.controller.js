const { isDelete, statusRoom, statusBook, rowInPage } = require('../utils/const'); 
const configMysql = require('../config/mysql.config')
const mysql = require('mysql2/promise');
const {verifiedToken} = require('../Helpers/validateToken.helper')
const {decodeToken} = require('../Helpers/decodeToken.helper');
const { user } = require('../config/mysql.config');


const queryRoomServiceDetailByBookid =
	`SELECT bookid, id, roomserviceid 
	FROM RoomServiceDetails 
	WHERE bookid = ? `;

const queryBookDetailByBookid =
	`SELECT bookid, id, customerid 
	FROM BookDetails 
	WHERE bookid = ? `;

const getBook = async (request, response) => {
		
	response.render('Book', {title : 'Books'})
}

const getBookByRole = async (request, response) => {
	let token = request.headers.authorization;
    token = token.replace('Bearer ', '')
	const role = decodeToken(token, process.env.KEY_JWTOKEN).role || '';
	
	if (role === 'staff') {
		
		response.render('Book', {title : 'Books',layout:'layoutstaff'})
		return;
	}
	
	response.render('Book', {title : 'Books', layout:"layout"})
}

const getAllBook = async (request, response) =>{
	
	try {
			var queryBooks = `SELECT main.id,  cus.fullname, 
			roo.roomname , main.statusBook, pay.paymentname  , main.checkindate, 
			main.checkoutdate, main.totalmoney, sta.statusname 
			FROM Books main 
			LEFT JOIN Bookdetails det ON (main.id = det.bookid) 
			LEFT JOIN Rooms roo ON (main.roomid = roo.id)
			LEFT JOIN Payments pay ON (main.paymentid = pay.id)
			LEFT JOIN Customers cus ON (det.customerid = cus.id)
			LEFT JOIN Statuss sta ON (sta.id = main.statusbook)
			WHERE det.id = 1  AND main.isDelete = ${isDelete.false}  
			ORDER BY main.checkindate DESC
			`; 
			const pool = mysql.createPool(configMysql);
			var books = await pool.query(queryBooks);
			books = books[0];
			
			for( let i = 0; i <books.length; i++ ) {
				books[i].checkindate = books[i].checkindate.toLocaleString();
				books[i].checkoutdate = books[i].checkoutdate.toLocaleString();
			}
			await pool.end();			
			response.json({
				book: books,
				success: true, 
				rowInPage: rowInPage
			});
			
		
	} catch (error) {
		console.log("Error ::: ", error.message);
		response.json({
			message: error.message,
			success: false
		})
	}
}
const getBookByIdFromTo = async (request, response) =>{
	console.log("getAllBook")
	try {
		const {id, rowinpage} = request.params;
		
			var queryBooks = `SELECT main.id,  cus.fullname, 
			roo.roomname , main.statusBook, pay.paymentname  , main.checkindate, 
			main.checkoutdate, main.totalmoney, sta.statusname 
			FROM Books main 
			LEFT JOIN Bookdetails det ON (main.id = det.bookid) 
			LEFT JOIN Rooms roo ON (main.roomid = roo.id)
			LEFT JOIN Payments pay ON (main.paymentid = pay.id)
			LEFT JOIN Customers cus ON (det.customerid = cus.id)
			LEFT JOIN Statuss sta ON (sta.id = main.statusbook)
			WHERE det.id = 1  AND main.isDelete = ${isDelete.false}  
			ORDER BY main.checkindate DESC
			LIMIT ? , ?
			`; 
			const pool = mysql.createPool(configMysql);
			var books = await pool.query(queryBooks, [parseInt(id), parseInt(rowinpage)]);
			books = books[0];
			
			for( let i = 0; i <books.length; i++ ) {
				books[i].checkindate = books[i].checkindate.toLocaleString();
				books[i].checkoutdate = books[i].checkoutdate.toLocaleString();
			}
			await pool.end();			
			response.json({
				book: books,
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

const getBookById = async (request, response) =>{
	console.log("getBookById ===>")
	try {
		const {id} = request.params;
	
		const queryBook = `
		SELECT main.*, roo.roomname, bde.*, rot.*, 
		pay.paymentname, sta.statusname,
		staf.username
		FROM Books main
		LEFT JOIN Rooms roo on (main.roomid = roo.id)
		LEFT JOIN Payments pay on (main.paymentid = pay.id)
		LEFT JOIN BookDetails bde on (main.id = bde.bookid)
		LEFT JOIN RoomTypes rot ON (roo.roomtype = rot.id)
		LEFT JOIN Statuss sta on (main.StatusBook = sta.id)
		LEFT JOIN Staffs staf on (main.staffid = staf.id)
		WHERE main.id = ? AND main.isDelete = ?
		AND bde.id = 1
		ORDER BY main.id ASC
		`;
		const queryBookDetail = `
		SELECT main.*, cus.fullname, cus.phone, cus.citizenIdentityCard, cut.customertypename 
		FROM BookDetails main
		LEFT JOIN Customers cus on (main.customerid = cus.id)
		LEFT JOIN Customertypes cut on (cus.customertype = cut.id)
		WHERE main.bookid =${id} AND main.isDelete = ${isDelete.false} 
		ORDER BY main.id ASC
		`;

		const queryRoomServiceDetail = `
		SELECT main.roomserviceid, roo.roomservicename, roo.price, main.quantity 
		FROM RoomServiceDetails main
		LEFT JOIN RoomServices roo on (main.roomserviceid = roo.id)
		WHERE main.bookid = ${id} AND main.isDelete = ${isDelete.false} 
		ORDER BY main.id ASC
		`;
		const pool = mysql.createPool(configMysql);
		var books = await pool.query(queryBook, [id, isDelete.false]);

		const bookdetail = await pool.query(queryBookDetail);
		const roomservicedetail = await pool.query(queryRoomServiceDetail);
		await pool.end();
		books = books[0];		
		for( let i = 0; i <books.length; i++ ) {
			books[i].checkindate = books[i].checkindate.toLocaleString();
			books[i].checkoutdate = books[i].checkoutdate.toLocaleString();
		}
		response.json({
			book: books, 
			bookdetail: bookdetail[0],
			roomservicedetail: roomservicedetail[0],
			success: true
		})
		
	
	} catch (error) {
		console.log("Error ::: ", error.message);
		response.json({
			message: error.message,
			success: false
		})
	}
}

const searchBook = async (request, response) =>{
	console.log("getBoook ===>")
	try {
		const {search} = request.body;
		 
		const queryBook = `
		SELECT main.id,  cus.fullname, 
		roo.roomname , main.statusBook, pay.paymentname  , main.checkindate, 
		main.checkoutdate, main.totalmoney, sta.statusname
		FROM Books main
		LEFT JOIN Rooms roo on (main.roomid = roo.id)
		LEFT JOIN Payments pay on (main.paymentid = pay.id)
		LEFT JOIN BookDetails bde on (main.id = bde.bookid)
		LEFT JOIN Customers cus on (bde.customerid = cus.id)
		LEFT JOIN RoomTypes rot ON (roo.roomtype = rot.id)
		LEFT JOIN Statuss sta on (main.StatusBook = sta.id)
		WHERE  cus.fullname LIKE '%${search}%' 
		OR roo.roomname LIKE '%${search}%' 
		OR sta.statusname LIKE '%${search}%' 		
		AND main.isDelete = ?
		AND bde.id = 1
		ORDER BY main.checkindate DESC
		`;
		const pool = mysql.createPool(configMysql);
		var books = await pool.query(queryBook,[isDelete.false]);
				
		await pool.end();
		books = books[0];		
		for( let i = 0; i <books.length; i++ ) {
			books[i].checkindate = books[i].checkindate.toLocaleString();
			books[i].checkoutdate = books[i].checkoutdate.toLocaleString();
		}
		
		response.json({
			data: books, 
			success: true, 
			rowInPage: rowInPage
		})
		
	
	} catch (error) {
		console.log("Error ::: ", error.message);
		response.json({
			message: error.message,
			success: false
		})
	}
}
const postBook = async (request, response) =>{
	console.log("postBook")
	try {		
		
		const { idroom, paymentid, customerid, 
			roomserviceid, quantityTemp, checkindate, checkoutdate, totalmoney} 
			= request.body;

		if(!(customerid && customerid.length >0)) {
			response.json({
				message: "Error",
				success: false
			})
			return;
		}		
		
		const pool = mysql.createPool(configMysql)
		//xóa dữ liệu cũ
		var bookidtemp = 0;		

		const check = await pool.query(`
		INSERT INTO Books (roomid, paymentid, checkoutdate, checkindate, totalmoney)	
		VALUES (?, ?, ?, ?, ?) `, 
		[idroom, paymentid, checkoutdate, checkindate, totalmoney]);
		
		await pool.query(`UPDATE Rooms SET status = ? WHERE id = ?`,
		[statusRoom.DANGTHUE, idroom])

		bookidtemp = check[0].insertId;
		
		if(bookidtemp !== 0) {
			var valueBookdetail ="";	
			//phải có khách hàng			
			
			if(customerid && customerid.length >0) {	
				if(typeof(customerid) === 'object') {
					for(let index = 0 ; index <customerid.length ; index++){
						valueBookdetail += `(${index+1} ,${bookidtemp}, ${customerid[index]} )`
						if(index <customerid.length - 1){
							valueBookdetail += ",";
						}
					}
				} else if (typeof(customerid) === 'string') {

					valueBookdetail = `(1 , ${bookidtemp}, ${customerid}) `;
				}
				
				let queryBookDetail =`INSERT INTO Bookdetails(id, bookid, customerid)
				VALUES ${valueBookdetail} `;

				await pool.query(queryBookDetail);			
	
				var valueRoomServiceDetail ="";	
				if (roomserviceid && roomserviceid.length > 0) {
					if (typeof(roomserviceid) === 'object') {
						for(let index = 0 ; index <roomserviceid.length ; index++){
							valueRoomServiceDetail += 
							`(${index+1} ,${bookidtemp}, ${roomserviceid[index]}, ${quantityTemp[index]}  )`
							if(index <roomserviceid.length - 1){
								valueRoomServiceDetail += ",";
							}
						}
					} else if (typeof(roomserviceid) === 'string'){
						valueRoomServiceDetail = ` (1, ${bookidtemp} , ${roomserviceid} , ${quantityTemp}) `
					}
					
					let queryRoomServiceDetail =`INSERT INTO Roomservicedetails(id, bookid, roomserviceid, quantity)
					VALUES ${valueRoomServiceDetail} `;

					await pool.query(queryRoomServiceDetail);

				}
				await pool.end();
				response.json({
					message: "Success",
					success: true
				})
			}
		}
	} catch (error) {
		console.log("Error ::: ", error.message);
		response.json({
			message: error.message,
			success: false
		})
	}
}
const putBook = async (request, response) =>{
	console.log("putBook ===>>>>")
	try {	
		
		
		const {bookid, idroom, paymentid, customerid, roomserviceid, quantityTemp, checkoutdate, totalmoney} = request.body;
		
		if(!(customerid && customerid.length >0)) {
			response.json({
				message: "Error",
				success: false
			})
			return;
		}
		const pool = mysql.createPool(configMysql)
		//xóa dữ liệu cũ
		if(bookid) {
			
			var deleteRoomService = ``;			
			let roomServiceDetailByBookid = await pool.query(queryRoomServiceDetailByBookid, [bookid]);
			roomServiceDetailByBookid = roomServiceDetailByBookid[0];

			for(let i=0; i< roomServiceDetailByBookid.length ; i++) {

				deleteRoomService = `DELETE FROM RoomServiceDetails WHERE bookid = 
				${roomServiceDetailByBookid[i].bookid} AND id = ${roomServiceDetailByBookid[i].id} 
				AND roomserviceid = ${roomServiceDetailByBookid[i].roomserviceid} ;
				`
				await pool.query(deleteRoomService);
			}

			let bookdetails = await pool.query(queryBookDetailByBookid, [bookid]);
			bookdetails = bookdetails[0];


			for(let i=0; i< bookdetails.length ; i++) {
				
				deleteRoomService = `DELETE FROM BookDetails WHERE bookid = 
				${bookdetails[i].bookid} AND id = ${bookdetails[i].id} 
				AND customerid = ${bookdetails[i].customerid} ;
				`
				await pool.query(deleteRoomService);
			}	
			const temp1 = await pool.query(`SELECT * FROM Books WHERE id = ?`, [bookid]);
			

			await pool.query(`UPDATE Books SET roomid = ?, paymentid = ? , checkoutdate = ?, totalmoney = ?
			WHERE id = ?`,[idroom, paymentid, checkoutdate, totalmoney, bookid]);

			const temp2 = await pool.query(`SELECT * FROM Books WHERE id = ?`, [bookid]);
			
			var valueBookdetail ="";	
			//phải có khách hàng	

			if(customerid && customerid.length >0) {	
				if(typeof(customerid) === 'object') {
					for(let index = 0 ; index <customerid.length ; index++){
						valueBookdetail += `(${index+1} ,${bookid}, ${customerid[index]} )`
						if(index <customerid.length - 1){
							valueBookdetail += ",";
						}
					}
				} else if (typeof(customerid) === 'string') {

					valueBookdetail = `(1 , ${bookid}, ${customerid}) `;
				}
				
				let queryBookDetail =`INSERT INTO Bookdetails(id, bookid, customerid)
				VALUES ${valueBookdetail} `;

				await pool.query(queryBookDetail);			
	
				var valueRoomServiceDetail ="";	
				if (roomserviceid && roomserviceid.length > 0) {
					if (typeof(roomserviceid) === 'object') {
						for(let index = 0 ; index <roomserviceid.length ; index++){
							valueRoomServiceDetail += 
							`(${index+1} ,${bookid}, ${roomserviceid[index]}, ${quantityTemp[index]}  )`
							if(index <roomserviceid.length - 1){
								valueRoomServiceDetail += ",";
							}
						}
					} else if (typeof(roomserviceid) === 'string'){
						valueRoomServiceDetail = ` (1, ${bookid} , ${roomserviceid} , ${quantityTemp}) `
					}
					
					let queryRoomServiceDetail =`INSERT INTO Roomservicedetails(id, bookid, roomserviceid, quantity)
					VALUES ${valueRoomServiceDetail} `;
					
					await pool.query(queryRoomServiceDetail);

				}
				await pool.end();
				
				response.json({
					message: "Success",
					success: true
				})
			}
		} 
	} catch (error) {
		console.log("Error ::: ", error.message);
		response.json({
			message: error.message,
			success: false
		})
	}
}

const putBookSuccess = async (request, response) =>{
	console.log("putBookSuccess ===>>>>")
	try {
		const {bookid, roomid, staffid } = request.body;
		const queryBook = `UPDATE Books SET statusBook = ?,
		staffid = ?
		WHERE id = ?`;
		const queryRoom = `UPDATE Rooms SET status = ?
		WHERE id = ? `;
		
		const pool = mysql.createPool(configMysql)
		await pool.query(queryBook, [statusBook.DATHANHTOAN,staffid,  bookid]);
		await pool.query(queryRoom, [statusRoom.SANSANG, roomid]);
		await pool.end();
		response.json({
			message: "Success",
			success: true
		})
		
	} catch (error) {
		console.log("Error ::: ", error.message);
		response.json({
			message: error.message,
			success: false
		})
	}
}

const deleteBook = (request, response) =>{
	console.log("deleteBook")
}

const loadBookData = async (request, response) =>{
	
	try {
		console.log("loadBookData")

		const queryRoom = `SELECT main.*, roo.roomtypename, roo.price 
		FROM Rooms main 
		LEFT JOIN Roomtypes roo ON (main.roomtype = roo.id)
		WHERE roo.isDelete = ${isDelete.false} AND main.isDelete =${isDelete.false} `;
		const queryPayment = `SELECT * FROM Payments WHERE  isDelete = ${isDelete.false}`;

		const queryCustomer = `SELECT main.*, cus.customertypename 
		FROM Customers main 
		LEFT JOIN Customertypes cus ON (main.customertype = cus.id)
		WHERE main.isDelete = ${isDelete.false} AND cus.isDelete = ${isDelete.false}`;

		const queryRoomService = `SELECT * FROM RoomServices WHERE isDelete = ${isDelete.false}`;

		const pool = mysql.createPool(configMysql);

		const rooms = await pool.query(queryRoom);
		const payments = await pool.query(queryPayment);
		const customers = await pool.query(queryCustomer);
		const roomservices = await pool.query(queryRoomService);
		await pool.end();

		response.json({
			rooms: rooms[0],
			payments: payments[0],
			customers: customers[0],
			roomservices:roomservices[0],
			success: true
		})
		
	} catch (error) {
		console.log("Error ::: ", error.message);
		response.json({
			message: error.message,
			success: false
		})
	}
}


module.exports = {
    getBookById, postBook, putBook, 
	deleteBook, getAllBook, loadBookData, 
	getBook, putBookSuccess, getBookByIdFromTo,
	searchBook, getBookByRole
};

