const database = require('../config/mysql');

const getRoom = async (request, response) => {
    console.log("getRoom")
    response.render('Room', {title : 'Room Information'});
}

const getAllRoom =  (request, response) => {
    console.log("getAllRoom ::::")
    
	var action = request.body.action;
    try {
        if(action == 'fetch')
		{
			var query = `SELECT main.id, main.name, roo.price AS price, main.description, 
            main.status, roo.name AS roomtype
			FROM Rooms main LEFT JOIN Roomtype roo on (main.roomtype = roo.id)
			WHERE main.isDelete = FALSE  ORDER BY main.id ASC`;  
			database.query(query, function(error, _data){
				console.log(error)

				database.query(`SELECT * FROM Roomtype 
						WHERE isDelete = FALSE  ORDER BY id ASC`, (err, _roomType) => {
                            console.log("Error:::", err)
							console.log("Roomtype::: ", _roomType);
							console.log("data::: ", _data);
							response.json({
								data: _data,
								roomtype: _roomType,
							});
						})	
				
			});
		}    

	if(action == 'Add')
	{

        const {name, roomtype,  description} = request.body;	
		var query = `
		INSERT INTO Rooms 
		(name, roomtype,  description) 
		VALUES ('${name}', '${roomtype}', '${description}') `;

		database.query(query, function(error, data){
            console.log("Error::: ",error)
			response.json({
				message : 'Data Added'
			});
		});
	}

	if(action == 'fetch_single')
	{
		var id = request.body.id;

		var query = `SELECT * FROM Rooms WHERE id = "${id}"`;

		database.query(query, function(error, data){

			response.json(data[0]);

		});
	}

	if(action == 'Edit')
	{
		const {id, name, roomtype,  description} = request.body;	
        console.log(request.body);
		var query = `
		UPDATE Rooms 
		SET name = "${name}", 
		roomtype = "${roomtype}",   
		description = "${description}" 
		WHERE id = "${id}"
		`;

		database.query(query, function(error, data){
            console.log("Error ::: ", error);
			response.json({
				message : 'Data Edited'
			});
		});
	}

	if(action == 'delete')
	{
		var id = request.body.id;

        var query = `
		UPDATE Rooms 
		SET isDelete = TRUE
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
    getRoom,
    getAllRoom
};

