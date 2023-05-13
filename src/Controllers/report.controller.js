const { isDelete, statusRoom, statusBook , rowInPage } = require('../utils/const'); 
const configMysql = require('../config/mysql.config')
const mysql = require('mysql2/promise');
const {verifiedToken} = require('../Helpers/validateToken.helper')

const queryRoomServiceDetailByBookid =
	`SELECT bookid, id, roomserviceid 
	FROM RoomServiceDetails 
	WHERE bookid = ? `;

const queryBookDetailByBookid =
	`SELECT bookid, id, customerid 
	FROM BookDetails 
	WHERE bookid = ? `;

const getReport = async (request, response) => {
		
	response.render('Report', {title : 'Reports', role:'admin'});
}
const getReportByStaff = async (request, response) => {
		
	response.render('Report', {title : 'Reports', layout:'layoutstaff'});
}
const searchReport = async (request, response) =>{
	console.log("getAllBook")
	try {
		console.log(request.params)
		const {checkdatefrom, checkdateto} = request.params
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
			AND main.checkoutdate >= ? AND main.checkoutdate <= ?  
			ORDER BY main.checkoutdate DESC
			`; 
			const pool = mysql.createPool(configMysql);
			var books = await pool.query(queryBooks, [checkdatefrom, checkdateto]);
			books = books[0];
			await pool.end();	
			var totalmoney = 0;
			for( let i = 0; i <books.length; i++ ) {
				//console.log("trướcif ==>", books[i].totalmoney)
				if(books[i].totalmoney > 0 && books[i].totalmoney){
					//console.log("totalmoney ==>", books[i].totalmoney)	
					totalmoney += parseInt(books[i].totalmoney);
				}				
				books[i].checkindate = books[i].checkindate.toLocaleString();
				books[i].checkoutdate = books[i].checkoutdate.toLocaleString();
			}
			
			response.json({
				book: books,
				totalmoney: totalmoney,
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
		console.log("IDD == >>", id ,  "  row ===>", rowinpage)
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

module.exports = {
    getReport,
	searchReport,
	getBookByIdFromTo,
	getReportByStaff
};

