
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
		console.log("IDD == >>", id ,  "  row ===>", rowinpage)
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
		console.log("Error ::: ", error.message);
		response.json({
			message: error.message,
			success: false
		})
	}
}

const postStaff = async (request, response) => {
	console.log("postStaff");
	try {
		console.log(request.body);
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
		console.log("Error ::: ", error.message);
		response.json({
			message: error.message,
			success: false
		})
	}
}
const putStaffById = async (request, response) => {
	console.log("putStaffById");
	try {
		const {id, username, password, branchtype} = request.body;	
        console.log(request.body);
		var query = `
		UPDATE Staffs 
		SET username = ?, 
		branchtype = ?,   
		description = ? 
		WHERE id = ?
		`;
		const pool = mysql.createPool(configMysql);
		await pool.query(query,[username, password, branchtype, id]);
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
const deleteStaffById = async (request, response) => {
	console.log("deleteStaffById");
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
		console.log("Error ::: ", error.message);
		response.json({
			message: error.message,
			success: false
		})
	}
}

const getStaffById = async (request, response) => {
	console.log("getStaffById");
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
		console.log("Error ==>::: ", error.message);
		response.json({
			message: error.message,
			success: false
		})
	}
}

const searchStaff = async (request, response) => {
	
	try {
		const {search} = request.body;

		var query = `SELECT main.*, bra.branchname
		FROM Staffs main
		LEFT JOIN branchs bra on (bra.id = main.branchtype)
		
		WHERE main.username LIKE '%${search}%' 
		OR bra.branchname LIKE '%${search}%'
		AND main.isDelete = ?  
		`;
		
		const pool = mysql.createPool(configMysql);
		const Staff = await pool.query(query,[isDelete.false]);
		await pool.end();
		console.log(Staff[0])
		response.json({
			data: Staff[0],
			success: true, 
			rowInPage: rowInPage
		});
	} catch (error) {
		console.log("Error ==>::: ", error.message);
		response.json({
			message: error.message,
			success: false
		})
	}
}

const getAllStaff = async (request, response) => {
    console.log("getAllStaff ::::")
    
	
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
        console.log("Error ::: ", error.message);
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

