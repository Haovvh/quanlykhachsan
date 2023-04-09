const {decodeToken} = require('../Helpers/decodeToken.helper')
const configMysql = require('../config/mysql.config')
const mysql = require('mysql2/promise')

const addCustomerType = async (req, res) => {
    const pool = mysql.createPool(configMysql)    
    const allCustomerType = await pool.query(`SELECT * 
         FROM CustomerType WHERE 1 = 1 `);   
    
    await pool.end();
    console.log(allCustomerType[0]);
    res.render('CustomerType', {
        result: allCustomerType[0],
        table: 'CustomerType',
        message: "OK"
    });     
}

const updateCustomerType = async (req, res) => {
    const pool = mysql.createPool(configMysql)    
    const allCustomerType = await pool.query(`SELECT * 
         FROM CustomerType WHERE 1 = 1 `);   
    
    await pool.end();
    console.log(allCustomerType[0]);
    res.render('CustomerType', {
        result: allCustomerType[0],
        table: 'CustomerType',
        message: "OK"
    });
}
const deleteCustomerType = async (req, res) => {
    const pool = mysql.createPool(configMysql)    
    const allCustomerType = await pool.query(`SELECT * 
         FROM CustomerType WHERE 1 = 1 `);   
    
    await pool.end();
    console.log(allCustomerType[0]);
    res.render('CustomerType', {
        result: allCustomerType[0],
        table: 'CustomerType',
        message: "OK"
    });
}
const getCustomerType = async (req, res) => {
    const pool = mysql.createPool(configMysql)    
    const allCustomerType = await pool.query(`SELECT * 
         FROM CustomerType WHERE 1 = 1 `);   
 
    await pool.end();
    console.log(allCustomerType[0]);
    res.render('CustomerType', {
        result: allCustomerType[0],
        table: 'CustomerType',
        message: "OK"
    });
}
const getAllCustomerType = async (req, res) => {
    const pool = mysql.createPool(configMysql)    
    const allCustomerType = await pool.query(`SELECT * 
         FROM CustomerType WHERE 1 = 1 `);   
    
    await pool.end();
    console.log(allCustomerType[0]);
    res.render('CustomerType', {
        result: allCustomerType[0],
        table: 'CustomerType',
        message: "OK"
    });
}
module.exports = {
    addCustomerType,
    getCustomerType,
    getAllCustomerType,
    updateCustomerType,
    deleteCustomerType
};

