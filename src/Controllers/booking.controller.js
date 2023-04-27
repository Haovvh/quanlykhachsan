const { isDelete, statusRoom, statusBook } = require('../utils/const'); 
const configMysql = require('../config/mysql.config')
const mysql = require('mysql2/promise');


const queryRoomServiceDetailByBookid =
	`SELECT bookid, id, roomserviceid 
	FROM RoomServiceDetails 
	WHERE bookid = ? `;

const queryBookDetailByBookid =
	`SELECT bookid, id, customerid 
	FROM BookDetails 
	WHERE bookid = ? `;

const getBook = async (request, response) => {
	console.log("Get All book")
		
	response.render('Booking', {title : 'Book Information'});
}
const getAllBook = async (request, response) =>{
	console.log("getAllBook")
	try {
			var queryBooks = `SELECT main.id,  cus.fullname, 
			roo.roomname , pay.paymentname  , main.checkindate, 
			main.checkoutdate, main.totalmoney, sta.statusname 
			FROM Books main 
			LEFT JOIN Bookdetails det ON (main.id = det.bookid) 
			LEFT JOIN Rooms roo ON (main.roomid = roo.id)
			LEFT JOIN Payments pay ON (main.paymentid = pay.id)
			LEFT JOIN Customers cus ON (det.customerid = cus.id)
			LEFT JOIN RoomServiceDetails rod ON (main.id = rod.bookid)
			LEFT JOIN RoomServices ros ON (rod.roomserviceid = ros.id)
			LEFT JOIN Statuss sta ON (sta.id = main.statusbook)
			WHERE det.id = 1  AND main.isDelete = ${isDelete.false}  
			ORDER BY main.id ASC
			`; 
			const pool = mysql.createPool(configMysql);
			var books = await pool.query(queryBooks);
			books = books[0];
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
	console.log("getBoook ===>")
	try {
		const {id} = request.params;
	
		const queryBook = `
		SELECT main.*, roo.roomname, bde.*, rot.*, pay.paymentname 
		FROM Books main
		LEFT JOIN Rooms roo on (main.roomid = roo.id)
		LEFT JOIN Payments pay on (main.paymentid = pay.id)
		LEFT JOIN BookDetails bde on (main.id = bde.bookid)
		LEFT JOIN RoomTypes rot ON (roo.roomtype = rot.id)
		WHERE main.id = ? AND main.isDelete = ?
		AND main.statusBook = ? AND bde.id = 1
		ORDER BY main.id ASC
		`;
		const queryBookDetail = `
		SELECT main.*, cus.fullname, cus.phone, cus.citizenIdentityCard, cut.customertypename FROM BookDetails main
		LEFT JOIN Customers cus on (main.customerid = cus.id)
		LEFT JOIN Customertypes cut on (cus.customertype = cut.id)
		WHERE main.bookid =${id} AND main.isDelete = ${isDelete.false} 
		ORDER BY main.id ASC
		`;

		const queryRoomServiceDetail = `
		SELECT main.roomserviceid, main.quantity FROM RoomServiceDetails main
		LEFT JOIN RoomServices roo on (main.roomserviceid = roo.id)
		WHERE main.bookid = ${id} AND main.isDelete = ${isDelete.false} 
		ORDER BY main.id ASC
		`;
		const pool = mysql.createPool(configMysql);
		var book = await pool.query(queryBook, [id, isDelete.false, statusBook.CHUATHANHTOAN]);

		const bookdetail = await pool.query(queryBookDetail);
		const roomservicedetail = await pool.query(queryRoomServiceDetail);
		await pool.end();
		book = book[0];
		
		console.log("queryboook ====> ", book)
		response.json({
			book: book, 
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
const postBook = async (request, response) =>{
	console.log("postBook")
	try {		
		console.log("===>request ::: ", request.body)
		const { idroom, paymentid, customerid, roomserviceid, quantityTemp, checkindate, checkoutdate, totalmoney} = request.body;

		if(!(customerid && customerid.length >0)) {
			response.json({
				message: "Error",
				success: false
			})
			return;
		}		
		console.log("1")
		const pool = mysql.createPool(configMysql)
		//xóa dữ liệu cũ
		var bookidtemp = 0;		

		const check = await pool.query(`INSERT INTO Books (roomid, paymentid, checkoutdate, checkindate, totalmoney)	
		VALUES (?, ?, ?, ?, ?) `, [idroom, paymentid, checkoutdate, checkindate, totalmoney]);
		console.log("2")
		await pool.query(`UPDATE Rooms SET status = ? WHERE id = ?`,[statusRoom.DANGTHUE, idroom])

		bookidtemp = check[0].insertId;
		console.log("3")
		if(bookidtemp !== 0) {
			var valueBookdetail ="";	
			//phải có khách hàng			
			console.log("4")
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
				console.log("5")
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
		
		console.log("===>request ::: ", request.body)
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
			console.log("bookid")
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
			console.log("temp1 ===> ", temp1[0][0]); 

			await pool.query(`UPDATE Books SET roomid = ?, paymentid = ? , checkoutdate = ?, totalmoney = ?
			WHERE id = ?`,[idroom, paymentid, checkoutdate, totalmoney, bookid]);

			const temp2 = await pool.query(`SELECT * FROM Books WHERE id = ?`, [bookid]);
			console.log("temp2 ===> ", temp2[0][0]); 
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
				console.log("Success ==== >")
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
		console.log("===>putBookSuccessrequest ::: ", request.body)
		const {bookid, roomid } = request.body;
		const queryBook = `UPDATE Books SET statusBook = ? 
		WHERE id = ?`;
		const queryRoom = `UPDATE Rooms SET status = ?
		WHERE id = ? `;

		const pool = mysql.createPool(configMysql)
		await pool.query(queryBook, [statusBook.DATHANHTOAN, bookid]);
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
	console.log(" loadBookData loadBookData loadBookData ==>")
	try {
		console.log("loadBookData")

		const queryRoom = `SELECT main.*, roo.roomtypename, roo.price FROM Rooms main 
			LEFT JOIN Roomtypes roo ON (main.roomtype = roo.id)
			WHERE roo.isDelete = ${isDelete.false} AND main.isDelete =${isDelete.false} AND main.status = 1`;
		const queryPayment = `SELECT * FROM Payments WHERE  isDelete = ${isDelete.false}`;

		const queryCustomer = `SELECT main.*, cus.customertypename FROM Customers main 
			LEFT JOIN Customertypes cus ON (main.customertype = cus.id)
			WHERE main.isDelete = ${isDelete.false} AND cus.isDelete = ${isDelete.false}`;

		const queryRoomService = `SELECT * FROM RoomServices WHERE isDelete = ${isDelete.false}`;

		const pool = mysql.createPool(configMysql);

		const rooms = await pool.query(queryRoom);
		const payments = await pool.query(queryPayment);
		const customers = await pool.query(queryCustomer);
		const roomservices = await pool.query(queryRoomService);

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
    getBookById, postBook, putBook, deleteBook, getAllBook, loadBookData, getBook, putBookSuccess
};
