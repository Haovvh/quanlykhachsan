const {decodeToken} = require('../Helpers/decodeToken.helper')
const configMysql = require('../config/mysql.config')
const mysql = require('mysql2/promise')

const addRoomType = async (req, res) => {
    const pool = mysql.createPool(configMysql)    
    const allRoomType = await pool.query(`SELECT * 
         FROM RoomType WHERE 1 = 1 `);   
    
    await pool.end();
    console.log(allRoomType[0]);
    res.render('RoomType', {
        result: allRoomType[0],
        table: 'RoomType',
        message: "OK"
    });     
}

const updateRoomType = async (req, res) => {
    const pool = mysql.createPool(configMysql)    
    const allRoomType = await pool.query(`SELECT * 
         FROM RoomType WHERE 1 = 1 `);   
    
    await pool.end();
    console.log(allRoomType[0]);
    res.render('RoomType', {
        result: allRoomType[0],
        table: 'RoomType',
        message: "OK"
    });
}
const deleteRoomType = async (req, res) => {
    const pool = mysql.createPool(configMysql)    
    const allRoomType = await pool.query(`SELECT * 
         FROM RoomType WHERE 1 = 1 `);   
    
    await pool.end();
    console.log(allRoomType[0]);
    res.render('RoomType', {
        result: allRoomType[0],
        table: 'RoomType',
        message: "OK"
    });
}
const getRoomType = async (req, res) => {
    const pool = mysql.createPool(configMysql)    
    const allRoomType = await pool.query(`SELECT * 
         FROM RoomType WHERE 1 = 1 `);   
 
    await pool.end();
    console.log(allRoomType[0]);
    res.render('RoomType', {
        result: allRoomType[0],
        table: 'RoomType',
        message: "OK"
    });
}
const getAllRoomType = async (req, res) => {
    const pool = mysql.createPool(configMysql)    
    const allRoomType = await pool.query(`SELECT * 
         FROM RoomType WHERE 1 = 1 `);   
    
    await pool.end();
    console.log(allRoomType[0]);
    res.render('RoomType', {
        result: allRoomType[0],
        table: 'RoomType',
        message: "OK"
    });
}
module.exports = {
    addRoomType,
    getRoomType,
    getAllRoomType,
    updateRoomType,
    deleteRoomType
};

