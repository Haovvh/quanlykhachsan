const {response, request} = require('express');
const {decodeToken} = require('../Helpers/decodeToken.helper')
const configMysql = require('../config/mysql.config')
const mysql = require('mysql2/promise')
const bcrypt = require('bcrypt');
const { generateTokens } = require('../Helpers/generateTokens.helper');

const login = async ( req = request, res = response ) => {
    try {
         const { password, email } = req.body;    
         console.log(req.body);
         const pool = mysql.createPool(configMysql)    
         const existsEmail = await pool.query(`SELECT * 
         FROM users WHERE email = ? LIMIT 1`, [ email ]);   
 
         await pool.end();
 
         if( existsEmail[0].length === 0 ){
             //pool.end();
             return res.status(400).json({
                 resp: false,
                 message : 'Wrong email'
             });
         }
         console.log(existsEmail[0][0])
         const validatedPassword =  bcrypt.compareSync( password, existsEmail[0][0].password );
 
         if( !validatedPassword ){
 
             //pool.end();
             return res.status(400).json({
                 resp: false,
                 message: 'Wrong password'
             }); 
             
         }
         //id, password, role, email
         const token = await  generateTokens( existsEmail[0][0].id,existsEmail[0][0].password,
              existsEmail[0][0].fullname,existsEmail[0][0].email,existsEmail[0][0].role);    
         //pool.end();
         console.log(token)
         return res.redirect("/");
 
    } catch (error) {
 
     console.log(error)
         return res.status(500).json({
             resp: false,
             message : error
         });
    }
 }
 const changePassword = async ( req = request, res = response ) => {
 
     const { email, password } = req.body;    
 
    try {   
 
         const pool = mysql.createPool(configMysql)
         const existsEmail = await pool.query(`SELECT Users.user_ID, 
         Users.firstName, Users.lastName, Users.email, Users.password, 
         Users.role FROM Users WHERE Users.email = ? LIMIT 1`, [ email ]);       
 
         await pool.end();
 
         if( existsEmail[0].length === 0 ){
           
             return res.status(400).json({
                 resp: false,
                 message : 'Wrong email'
             });
         }
 
         const validatedPassword =  bcrypt.compareSync( password, existsEmail[0][0].password );
 
         if( !validatedPassword ){
 
             return res.status(400).json({
                 resp: false,
                 message: 'Wrong password'
             }); 
             
         }
 
         const token =  generateTokens( existsEmail[0][0].user_ID,existsEmail[0][0].password,
              existsEmail[0][0].name,existsEmail[0][0].email);
         return res.json({
             resp: true,
             message : 'Welcome Go Car VietNam',
             accessToken: token,
             id: existsEmail[0][0].user_ID,
             role: existsEmail[0][0].role,
             name: existsEmail[0][0].firstName + ' ' + existsEmail[0][0].lastName
         });       
 
    } catch (error) {
     console.log(error)
         return res.status(500).json({
             resp: false,
             message : error
         });
    }
 }
 
 
 
 module.exports = {
     login,
     changePassword
 };