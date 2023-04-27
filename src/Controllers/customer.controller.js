const database = require('../config/mysql');
const { isDelete } = require('../utils/const'); 
const {formatDate} = require('../utils/date');
const configMysql = require('../config/mysql.config')
const mysql = require('mysql2/promise');

const getCustomer = async (request, res) => {
    console.log("getcustomer")
    res.render('customer', {title : 'Customer Information'});
}

const getCustomerById = async (request, response) => {
    console.log("getCustomerById")
    try {
		console.log("fetchSingle")
		const {id} = request.params;
		console.log(request.params)

		var query = `SELECT main.id, main.fullname, main.citizenIdentityCard,
		main.address, main.phone, main.dateofbirth, main.gender, main.customertype, cus.customertypename
		FROM Customers main LEFT JOIN customertypes cus on (main.customertype = cus.id)
		WHERE main.id = "${id}"`;

		const pool = mysql.createPool(configMysql);
		const customer = await pool.query(query);
		await pool.end();
		console.log(customer[0])
		response.json({
			data: customer[0][0],
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

const searchCustomer = async (request, response) => {
    console.log("searchCustomer")
    try {
		const {search} = request.body;

		var query = `SELECT main.id, main.fullname, main.citizenIdentityCard,
		main.address, main.phone, main.dateofbirth, main.gender, 
		main.customertype, cus.customertypename, gen.gendername
		FROM Customers main 
		LEFT JOIN customertypes cus on (main.customertype = cus.id)
		LEFT JOIN genders gen on (main.gender = gen.id)
		WHERE main.fullname LIKE '%${search}%' OR  main.phone LIKE '%${search}%' `;

		const pool = mysql.createPool(configMysql);
		const customer = await pool.query(query);
		await pool.end();
		console.log(customer[0])
		response.json({
			data: customer[0],
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

const postCustomer = async (request, response) => {
    console.log("postCustomer")
    try {
		console.log("requestbody :::", request.body);
		console.log("data:::", request.body.data)
        const {fullname, phone, address, citizenIdentityCard, customertype, dateofbirth, gender} = request.body;	
        
		const date = formatDate(dateofbirth);

		var query = `
		INSERT INTO Customers 
		(fullname, phone, address, citizenIdentityCard, customertype, dateofbirth, gender) 
		VALUES ('${fullname}', '${phone}', '${address}', '${citizenIdentityCard}', 
        '${customertype}', '${date}', '${gender}') `;
		const pool = mysql.createPool(configMysql);
		await pool.query(query);
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

const putCustomerById = async (request, response) => {
    console.log("putCustomerById")
    try {
		console.log("Edit ::: ");
		const {id, fullname, phone, address, citizenIdentityCard, customertype, dateofbirth, gender} = request.body;	

        const date = formatDate(dateofbirth);
		var query = `
		UPDATE Customers 
		SET fullname = "${fullname}", 
		phone = "${phone}", 
		address = "${address}", 
		citizenIdentityCard = "${citizenIdentityCard}" ,
        customertype = "${customertype}", 
		dateofbirth = "${date}", 
		gender = "${gender}" 
		WHERE id = "${id}"
		`;
		const pool = mysql.createPool(configMysql);
		await pool.query(query);
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

const deleteCustomerById = async (request, response) => {
    console.log("deleteCustomerById")
    try {
		const {id} = request.body

        const query = `
		UPDATE Customers 
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

const getCustomerByIdFromTo = async (request, response) =>{
	console.log("getCustomerByIdFromTo")
	try {
		const {id, rowinpage} = request.params;
		console.log("IDD == >>", id ,  "  row ===>", rowinpage)
			
			var queryCustomer = `SELECT main.id, main.fullname, main.citizenIdentityCard,
			main.address, main.phone, main.dateofbirth, gen.gendername , cus.customertypename
			FROM Customers main LEFT JOIN CustomerTypes cus on (main.customertype = cus.id)
			LEFT JOIN Genders gen on (main.gender = gen.id)
			WHERE main.isDelete = ${isDelete.false}  ORDER BY main.id ASC
			LIMIT ? , ?`;
			var queryCustomerType =  `SELECT * FROM CustomerTypes 
			WHERE isDelete = ${isDelete.false}  ORDER BY id ASC`;
			var queryGender = `SELECT * FROM Genders 
			WHERE isDelete = ${isDelete.false}  ORDER BY id ASC`;
			const pool = mysql.createPool(configMysql);
			const customers = await pool.query(queryCustomer, [parseInt(id), parseInt(rowinpage)]);
			const customertypes = await pool.query(queryCustomerType);
			const genders = await pool.query(queryGender);

			await pool.end();			
			response.json({
				customers: customers[0],
				customerType: customertypes[0],
				genderType: genders[0],
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

const getAllCustomer = async (request, response) => {
	
    try {
		console.log("fetch");
			var queryCustomer = `SELECT main.id, main.fullname, main.citizenIdentityCard,
			main.address, main.phone, main.dateofbirth, gen.gendername , cus.customertypename
			FROM Customers main LEFT JOIN CustomerTypes cus on (main.customertype = cus.id)
			LEFT JOIN Genders gen on (main.gender = gen.id)
			WHERE main.isDelete = ${isDelete.false}  ORDER BY main.id ASC`; 
			var queryCustomerType =  `SELECT * FROM CustomerTypes 
			WHERE isDelete = ${isDelete.false}  ORDER BY id ASC`;
			var queryGender = `SELECT * FROM Genders 
			WHERE isDelete = ${isDelete.false}  ORDER BY id ASC`;
			const pool = mysql.createPool(configMysql);
			const customers = await pool.query(queryCustomer);
			const customertypes = await pool.query(queryCustomerType);
			const genders = await pool.query(queryGender);

			response.json({
				data: customers[0],
				customerType: customertypes[0],
				genderType: genders[0],
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
    getCustomer,
    getAllCustomer,
    getCustomerById,
	postCustomer,
	putCustomerById,
	deleteCustomerById,
	getCustomerByIdFromTo,
	searchCustomer
};

