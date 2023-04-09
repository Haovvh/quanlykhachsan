const {decodeToken} = require('../Helpers/decodeToken.helper')
const configMysql = require('../config/mysql.config')
const mysql = require('mysql2/promise')

const addRoomService = async (req, res) => {
    const pool = mysql.createPool(configMysql)    
    const allRoomService = await pool.query(`SELECT * 
         FROM RoomService WHERE 1 = 1 `);   
    
    await pool.end();
    console.log(allRoomService[0]);
    res.render('RoomService', {
        result: allRoomService[0],
        table: 'RoomService',
        message: "OK"
    });     
}

const updateRoomService = async (req, res) => {
    const pool = mysql.createPool(configMysql)    
    const allRoomService = await pool.query(`SELECT * 
         FROM RoomService WHERE 1 = 1 `);   
    
    await pool.end();
    console.log(allRoomService[0]);
    res.render('RoomService', {
        result: allRoomService[0],
        table: 'RoomService',
        message: "OK"
    });
}
const deleteRoomService = async (req, res) => {
    const pool = mysql.createPool(configMysql)    
    const allRoomService = await pool.query(`SELECT * 
         FROM RoomService WHERE 1 = 1 `);   
    
    await pool.end();
    console.log(allRoomService[0]);
    res.render('RoomService', {
        result: allRoomService[0],
        table: 'RoomService',
        message: "OK"
    });
}
const getRoomService = async (req, res) => {
    const pool = mysql.createPool(configMysql)    
    const allRoomService = await pool.query(`SELECT * 
         FROM RoomService WHERE 1 = 1 `);   
 
    await pool.end();
    console.log(allRoomService[0]);
    res.render('RoomService', {
        result: allRoomService[0],
        table: 'RoomService',
        message: "OK"
    });
}
const getAllRoomService = async (req, res) => {
    const pool = mysql.createPool(configMysql)    
    const allRoomService = await pool.query(`SELECT * 
         FROM RoomService WHERE 1 = 1 `);   
    
    await pool.end();
    console.log(allRoomService[0]);
    res.render('RoomService', {
        result: allRoomService[0],
        table: 'RoomService',
        message: "OK"
    });
}
module.exports = {
    addRoomService,
    getRoomService,
    getAllRoomService,
    updateRoomService,
    deleteRoomService
};

