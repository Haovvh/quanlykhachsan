
const { isDelete } = require('../utils/const'); 
const configMysql = require('../config/mysql.config')
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const { generateTokens } = require('../Helpers/generateTokens.helper');
const { response } = require('express');

const getlogin = async (request, response) => {
    response.render('loginstaff');
}


const login = async (request, response) =>{
	try {
        const {username, password} = request.body;	
		console.log(username, password)
		const pool = mysql.createPool(configMysql);
		const isExistUserName = await pool.query(`SELECT * 
		FROM Staffs  		
		WHERE username = ? LIMIT 1`,[username]);
		
		if(!isExistUserName[0][0]) {
			await pool.end();
			response.json({
				message : "username is Exits",
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
const changepass = async (resquet, response) => {

}

module.exports = {
    login,    
    getlogin,
	changepass
};