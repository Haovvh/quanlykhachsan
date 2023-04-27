
const { isDelete } = require('../utils/const'); 
const configMysql = require('../config/mysql.config')
const mysql = require('mysql2/promise');

const getlogin = async (request, response) => {
    console.log("getlogin")
    response.render('Login', {title : 'Login'});
}


const login = async (request, response) =>{
	try {
		console.log("Body ::: ",request.body);
        const {username, password} = request.body;	
		
		const pool = mysql.createPool(configMysql);
		const isExistUserName = await pool.query(`SELECT * FROM Users WHERE username = ? LIMIT 1`,[username]);
		if(isExistUserName[0].length) {
			await pool.end();
			response.json({
				message : "Username is Exits",
				success: false
			});
			return;
		}
		await pool.end();
		const validatedPassword =  bcrypt.compareSync( password, isExistUserName[0][0].password );

		if(!validatedPassword) {
			await pool.end();
			response.json({
				message : "Password wrong",
				success: false
			});
			return;
		}
		const token = await  generateTokens( isExistUserName[0][0].username, isExistUserName[0][0].password,
			isExistUserName[0][0].role); 
		response.json({
			message : 'Login success',
			accessToken: token,
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
const register = async(request, response) =>{
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


module.exports = {
    login,
    register,
    getlogin
};