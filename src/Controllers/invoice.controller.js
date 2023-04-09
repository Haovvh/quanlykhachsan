const {decodeToken} = require('../Helpers/decodeToken.helper')
const configMysql = require('../config/mysql.config')
const mysql = require('mysql2/promise')

const addInvoice = async (req, res) => {
    const pool = mysql.createPool(configMysql)    
    const allInvoices = await pool.query(`SELECT * 
         FROM Invoices WHERE 1 = 1 `);   
    
    await pool.end();
    console.log(allInvoices[0]);
    res.render('Invoice', {
        result: allInvoices[0],
        table: 'Invoice',
        message: "OK"
    });     
}

const updateInvoice = async (req, res) => {
    const pool = mysql.createPool(configMysql)    
    const allInvoices = await pool.query(`SELECT * 
         FROM Invoices WHERE 1 = 1 `);   
    
    await pool.end();
    console.log(allInvoices[0]);
    res.render('Invoice', {
        result: allInvoices[0],
        table: 'Invoice',
        message: "OK"
    });
}
const deleteInvoice = async (req, res) => {
    const pool = mysql.createPool(configMysql)    
    const allInvoices = await pool.query(`SELECT * 
         FROM Invoices WHERE 1 = 1 `);   
    
    await pool.end();
    console.log(allInvoices[0]);
    res.render('Invoice', {
        result: allInvoices[0],
        table: 'Invoice',
        message: "OK"
    });
}
const getInvoice = async (req, res) => {
    const pool = mysql.createPool(configMysql)    
    const allInvoices = await pool.query(`SELECT * 
         FROM Invoices WHERE 1 = 1 `);   
 
    await pool.end();
    console.log(allInvoices[0]);
    res.render('Invoice', {
        result: allInvoices[0],
        table: 'Invoice',
        message: "OK"
    });
}
const getAllInvoice = async (req, res) => {
    const pool = mysql.createPool(configMysql)    
    const allInvoices = await pool.query(`SELECT * 
         FROM Invoices WHERE 1 = 1 `);   
    
    await pool.end();
    console.log(allInvoices[0]);
    res.render('Invoice', {
        result: allInvoices[0],
        table: 'Invoice',
        message: "OK"
    });
}
module.exports = {
    addInvoice,
    getInvoice,
    getAllInvoice,
    updateInvoice,
    deleteInvoice
};

