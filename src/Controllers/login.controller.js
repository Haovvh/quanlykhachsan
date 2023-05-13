
const { isDelete } = require('../utils/const'); 
const configMysql = require('../config/mysql.config')
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const { generateTokens } = require('../Helpers/generateTokens.helper');

const getlogin = async (request, response) => {
    response.render('login');
}


const login = async (request, response) =>{
	try {
        const {username, password} = request.body;	
		
		const pool = mysql.createPool(configMysql);
		const isExistUserName = await pool.query(`SELECT main.*, 
		rol.rolename AS role 
		FROM admin main 
		LEFT JOIN roles rol ON (main.roletype = rol.id)
		WHERE username = ? LIMIT 1`,[username]);
		
		if(!isExistUserName[0][0]) {
			await pool.end();
			response.json({
				message : "Username is Exits",
				success: false
			});
			return;
		}
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
			success: true,
			role: isExistUserName[0][0].role,
			username: username,
			id: isExistUserName[0][0].id
		});
		
	} catch (error) {
		console.log("Error ", error.message)
		response.json({
			message:  error,
			success: false
		})
	}
}
const registerStaff = async(request, response) =>{
	try {
		const { username, password} = request.body;	
		const salt = bcrypt.genSaltSync();
        const pass = bcrypt.hashSync( password, salt );
		
		var query = `
		INSERT INTO Staff (username, password)
		VALUE (?, ? ) `;
		const pool = mysql.createPool(configMysql);
		await pool.query(query,[username, pass]);
		await pool.end();
		response.json({
			message : 'Success',
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
    registerStaff,
    getlogin
};