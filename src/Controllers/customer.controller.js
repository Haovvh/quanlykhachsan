const database = require('../config/mysql');
const { isDelete } = require('../utils/const'); 
const {formatDate} = require('../utils/date');

const getCustomer = async (request, res) => {
    console.log("getcustomer")
    res.render('customer', {title : 'Customer Information'});
}

const getAllCustomer =  (request, response) => {
    console.log("getAllCustomer ::::")
    
	var action = request.body.action;
    try {
        if(action == 'fetch')
		{
			console.log("fetch");
			var query = `SELECT main.id, main.fullname, main.citizenIdentityCard,
			main.address, main.phone, main.dateofbirth, gen.name AS gender, cus.name AS customertype
			FROM Customers main LEFT JOIN CustomerType cus on (main.customertype = cus.id)
			LEFT JOIN Gender gen on (main.gender = gen.id)
			WHERE main.isDelete = ${isDelete.false}  ORDER BY main.id ASC`;  
			database.query(query, function(error, _data){
				console.log(error)

				database.query(`SELECT * FROM CustomerType 
					WHERE isDelete = ${isDelete.false}  ORDER BY id ASC`, (err, _customerType) => {

						database.query(`SELECT * FROM Gender 
						WHERE isDelete = ${isDelete.false}  ORDER BY id ASC`, (er, _genderType) => {
							console.log("gender::: ", _genderType);
							console.log("data::: ", _data);
							console.log("customerType::: ", _customerType);
							response.json({
								data: _data,
								customerType: _customerType,
								genderType: _genderType
							});
						})
						
					});		
				
			});
		}    

	if(action == 'Add')
	{
        const {fullname, phone, address, citizenIdentityCard, customertype, dateofbirth, gender} = request.body;	
        
		const date = formatDate(dateofbirth.toString());
		console.log("date :::", date);
		var query = `
		INSERT INTO Customers 
		(fullname, phone, address, citizenIdentityCard, customertype, dateofbirth, gender) 
		VALUES ('${fullname}', '${phone}', '${address}', '${citizenIdentityCard}', 
        '${customertype}', '${date}', '${gender}') `;

		database.query(query, function(error, data){
            console.log("Error::: ",error)
			console.log("ID:::: ", data);
			response.json({
				message : 'Data Added'
			});
		});
	}

	if(action == 'fetch_single')
	{
		var id = request.body.id;

		var query = `SELECT main.id, main.fullname, main.citizenIdentityCard,
		main.address, main.phone, main.dateofbirth, main.gender , main.customertype
		FROM Customers main
		WHERE main.id = "${id}"`;

		database.query(query, function(error, data){
			console.log("Error::: ",error)

			response.json(data[0]);

		});
	}

	if(action == 'Edit')
	{
		console.log("Edit ::: ");
		const {id, fullname, phone, address, citizenIdentityCard, customertype, dateofbirth, gender} = request.body;	
        console.log(request.body);
        const date = formatDate(dateofbirth.toString());
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
        console.log(query);
		database.query(query, function(error, data){
			response.json({
				message : 'Data Edited'
			});
		});
	}

	if(action == 'delete')
	{
		var id = request.body.id;

        var query = `
		UPDATE Customers 
		SET isDelete = ${isDelete.true}
		WHERE id = "${id}"
		`;

		database.query(query, function(error, data){

			response.json({
				message : 'Data Deleted'
			});

		});
	}
    } catch (error) {
        console.log("Error :::", error);
    }

	
}
module.exports = {
    getCustomer,
    getAllCustomer,
    
};

