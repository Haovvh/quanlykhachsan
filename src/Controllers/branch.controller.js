
const { isDelete , rowInPage } = require('../utils/const'); 
const configMysql = require('../config/mysql.config')
const mysql = require('mysql2/promise');
const {validateTokenRoleAdmin} = require('../Helpers/validateTokenRoleAdmin.helper')

const getBranch = async (request, response) => {
    
    response.render('Branch', {title : 'Branchs', layout: 'layout' });
}


const getAllBranch = async (request, response) => {

    try {		
		var query = `SELECT *
		FROM Branchs 
		WHERE isDelete = ${isDelete.false}  
		ORDER BY id DESC`;  
		const pool = mysql.createPool(configMysql);
		Branchs = await pool.query(query);
		pool.end();

		if(Branchs[0].length > 0){
			
			response.json({
				data: Branchs[0],
				success: true, 
				rowInPage: rowInPage
			})
		}
    } catch (error) {

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

		response.json({
			message:  "error",
			success: false
		})
	}
}

const searchBranch = async (request, response) =>{
	try {
		const {search} = request.body
		var searchWith = '';
		if(search !== '') {
			searchWith = ` AND Branchname LIKE '%${search}%'  `;
		}
		var query = `SELECT *
		FROM Branchs 
		WHERE  isDelete = ?
		 ` + searchWith;
		const pool = mysql.createPool(configMysql);
		const Branch = await pool.query(query, [isDelete.false]);
		pool.end();
		response.json({
			data:Branch[0],
			success: true, 
			rowInPage: rowInPage
		})
	} catch (error) {

		response.json({
			message:  "error",
			success: false
		})
	}
}

const postBranch = async (request, response) =>{
	try {
		
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
			message : 'Thêm mới thành công',
			success: true
		});
		
	} catch (error) {

		response.json({
			message:  error,
			success: false
		})
	}
}

const putBranchById = async(request, response) =>{
	try {
		
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
			message : 'Sửa thành công',
			success: true
		});
		
	} catch (error) {

		response.json({
			message: error.message,
			success: false
		})
	}
}

const deleteBranchById = async(request, response) =>{
	try {
		

		const {id} = request.body;
        var query = `
		UPDATE Branchs
		SET isDelete = ${isDelete.true}
		WHERE id = "${id}"
		`;
		const pool = mysql.createPool(configMysql);
		await pool.query(query);
		await pool.end();
		response.json({
			message : 'Xóa thành công',
			success: true
		});
	} catch (error) {

		response.json({
			message: error.message,
			success: false
		})
	}
}

const getBranchByIdFromTo = async (request, response) =>{

	try {
		const {id, rowinpage} = request.params;

			
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