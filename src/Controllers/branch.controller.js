
const { isDelete , rowInPage } = require('../utils/const'); 
const configMysql = require('../config/mysql.config')
const mysql = require('mysql2/promise');
const {validateTokenRoleAdmin} = require('../Helpers/validateTokenRoleAdmin.helper')

const getBranch = async (request, response) => {
    
    response.render('Branch', {title : 'Branchs', layout: 'layout' });
}


const getAllBranch = async (request, response) => {
    console.log("getAllBranch")
    try {		
		var query = `SELECT *
		FROM Branchs 
		WHERE isDelete = ${isDelete.false}  
		ORDER BY id ASC`;  
		const pool = mysql.createPool(configMysql);
		Branchs = await pool.query(query);
		pool.end();
		console.log(Branchs[0])
		if(Branchs[0].length > 0){
			
			response.json({
				data: Branchs[0],
				success: true, 
				rowInPage: rowInPage
			})
		}
    } catch (error) {
        console.log("Error :::", error.message);
		response.json({
			message: "Error", 
			success :false
		})
    }	
}

const getBranchById = async (request, response) =>{
	try {
		var {id} = request.params;

		var query = `SELECT *
		FROM Branchs 
		WHERE id = "${id}" AND isDelete = ${isDelete.false} `;
		const pool = mysql.createPool(configMysql);
		const Branch = await pool.query(query);
		pool.end();
		response.json({
			data:Branch[0][0],
			success: true
		})
	} catch (error) {
		console.log("Error ", error.message)
		response.json({
			message:  "error",
			success: false
		})
	}
}

const searchBranch = async (request, response) =>{
	try {
		const {search} = request.body

		var query = `SELECT *
		FROM Branchs 
		WHERE Branchname LIKE '%${search}%' 
		AND isDelete = ${isDelete.false} `;
		const pool = mysql.createPool(configMysql);
		const Branch = await pool.query(query);
		pool.end();
		response.json({
			data:Branch[0],
			success: true, 
			rowInPage: rowInPage
		})
	} catch (error) {
		console.log("Error ", error.message)
		response.json({
			message:  "error",
			success: false
		})
	}
}

const postBranch = async (request, response) =>{
	try {
		console.log("postBranch")
		
        const {branchname} = request.body;	
		var query = `
		INSERT INTO Branchs 
		(branchname ) 
		VALUES (?) `;
		const pool = mysql.createPool(configMysql);
		const isExistRoomName = await pool.query(`SELECT * FROM Branchs WHERE branchname LIKE '%${branchname}%' `);
		if(isExistRoomName[0][0]) {
			pool.end();
			response.json({
				message : "Branchname is Exits",
				success: false
			});
			return;
		}
		await pool.query(query,[branchname]);
		pool.end();
		response.json({
			message : 'Data Added',
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

const putBranchById = async(request, response) =>{
	try {
		validateTokenRoleAdmin();
		const {id, branchname} = request.body;	

		var query = `
		UPDATE Branchs
		SET branchname = ?		
		WHERE id = ?
		`;
		const pool = mysql.createPool(configMysql);
		await pool.query(query,[branchname, id]);
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

const deleteBranchById = async(request, response) =>{
	try {
		
		console.log(request.body);
		const {id} = request.body;
		console.log("deleteBranchById ==> ", id)
        var query = `
		UPDATE Branchs
		SET isDelete = ${isDelete.true}
		WHERE id = "${id}"
		`;
		const pool = mysql.createPool(configMysql);
		await pool.query(query);
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

const getBranchByIdFromTo = async (request, response) =>{
	console.log("getBranchByIdFromTo")
	try {
		const {id, rowinpage} = request.params;
		console.log("IDD == >>", id ,  "  row ===>", rowinpage)
			
			var query = `SELECT *
			FROM Branchs 
			WHERE isDelete = ${isDelete.false}  
			ORDER BY main.id ASC
			LIMIT ? , ?`;
			
			const pool = mysql.createPool(configMysql);
			const data = await pool.query(query, [parseInt(id), parseInt(rowinpage)]);
			
			await pool.end();			
			response.json({
				data: data[0],
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
    getBranch,
    getAllBranch,
    getBranchById,
	postBranch,
	putBranchById,
	deleteBranchById,
	searchBranch,
	getBranchByIdFromTo
};