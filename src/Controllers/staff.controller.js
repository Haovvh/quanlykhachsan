
const {isDelete, statusBook , rowInPage} = require('../utils/const');
const configMysql = require('../config/mysql.config')
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

const getStaff = async (request, response) => {
		
	response.render('Staff', {title : 'Staffs', layout:'layout'})
}
const getStaffByIdFromTo = async (request, response) =>{

	try {
		const {id, rowinpage} = request.params;
		
			var queryStaff = `SELECT main.*, bra.branchname
			FROM Staffs main 
			LEFT JOIN Branch bra on (main.branchtype = bra.id)			
			WHERE main.isDelete = ${isDelete.false}  
			ORDER BY main.id ASC
			LIMIT ? , ?
			`; 
			const pool = mysql.createPool(configMysql);
			const Staffs = await pool.query(queryStaff, [parseInt(id), parseInt(rowinpage)]);
			
			await pool.end();			
			response.json({
				Staffs: Staffs[0],
				success: true
			});
			
		
	} catch (error) {

		response.json({
			message: error.message,
			success: false
		})
	}
}

const postStaff = async (request, response) => {

	try {

		const {username, password, branchtype} = request.body;	
		const salt = bcrypt.genSaltSync();
        const pass = bcrypt.hashSync( password, salt );
		var query = `
		INSERT INTO Staffs 
		(username, password, branchtype) 
		VALUES (?, ? , ?) `;
		const pool = mysql.createPool(configMysql);
		await pool.query(query,[username, pass, branchtype]);
		await pool.end();
		response.json({
			message : 'Data Added',
			success: true
		});

	} catch (error) {

		response.json({
			message: error.message,
			success: false
		})
	}
}

const putStaffById = async (request, response) => {

	try {

		const {id,  password} = request.body;	

		var query = `
		UPDATE Staffs 
		SET password = ?
		WHERE id = ?
		`;
		const salt = bcrypt.genSaltSync();
        const pass = bcrypt.hashSync( password, salt );
		const pool = mysql.createPool(configMysql);
		await pool.query(query,[ pass, id]);
		await pool.end();
		response.json({
			message : 'Data Edited',
			success: true
		});
		
	} catch (error) {

		response.json({
			message: error.message,
			success: false
		})
	}
}
const deleteStaffById = async (request, response) => {

	try {
		var {id} = request.body;

        var query = `
		UPDATE Staffs 
		SET isDelete = ?
		WHERE id = ?
		`;
		const pool = mysql.createPool(configMysql);
		await pool.query(query,[isDelete.true, id]);
		await pool.end();
		response.json({
			message : 'Data Deleted',
			success: true
		});
		
	} catch (error) {

		response.json({
			message: error.message,
			success: false
		})
	}
}

const getStaffById = async (request, response) => {

	try {
		const {id} = request.params;

		var query = `SELECT main.*, bra.branchname 
		FROM Staffs main
		LEFT JOIN branchs bra on (bra.id = main.branchtype)
		WHERE main.id = ?
		AND main.isDelete = ?
		`;
		
		const pool = mysql.createPool(configMysql);
		const Staff = await pool.query(query, [id, isDelete.false]);
				
		response.json({
			data: Staff[0][0],			
			success: true
		});
	} catch (error) {

		response.json({
			message: error.message,
			success: false
		})
	}
}

const searchStaff = async (request, response) => {
	
	try {
		const {search} = request.body;
		var searchWith = '';
		if(search !== '') {
			searchWith = `AND main.username LIKE '%${search}%' 
			  `
		}
		var query = `SELECT main.*, 
		bra.branchname
		FROM Staffs main
		LEFT JOIN branchs bra on (bra.id = main.branchtype)		
		WHERE main.isDelete = ? 		
		` + searchWith;
		
		const pool = mysql.createPool(configMysql);
		const Staff = await pool.query(query,[isDelete.false]);
		await pool.end();

		response.json({
			data: Staff[0],
			success: true, 
			rowInPage: rowInPage
		});
	} catch (error) {

		response.json({
			message: error.message,
			success: false
		})
	}
}

const getAllStaff = async (request, response) => {
    
	
    try {
        var queryStaffs = `SELECT main.*, bra.branchname
			FROM Staffs main 
			LEFT JOIN branchs bra on (main.branchtype = bra.id)
			WHERE main.isDelete = ?
			ORDER BY main.id ASC
			`; 
			
		const pool = mysql.createPool(configMysql);
		const Staffs = await pool.query(queryStaffs,[isDelete.false]);
		
		var branchs = await pool.query(`SELECT * 
		FROM branchs 
		WHERE isDelete = ?
		ORDER BY id ASC`,[isDelete.false]);
		
		await pool.end();
		

		
		response.json({
			data: Staffs[0],
			branchs: branchs[0],
			success: true, 
			rowInPage: rowInPage
		});
			

    } catch (error) {

		response.json({
			message: error.message,
			success: false
		})
    }	
}
module.exports = {
   getStaff,
    getAllStaff,
	getStaffById,
	postStaff,
	putStaffById,
	deleteStaffById,
	getStaffByIdFromTo,
	searchStaff
};

