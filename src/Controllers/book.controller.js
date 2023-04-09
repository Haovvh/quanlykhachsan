const database = require('../config/mysql');
const { isDelete } = require('../utils/const'); 
const {formatDate} = require('../utils/date');

const getBook = async (request, res) => {
    console.log("Get All book")
    res.render('Book', {title : 'Book Information'});
}

const getAllBook =  (request, response) => {
    console.log("getAllBook ::::")
    
	var action = request.body.action;
    try {
        if(action == 'fetch')
		{
			console.log("fetch");
			var query = `SELECT main.id, main.roomid, main.userid,
			main.paymentid, main.bookdate, main.chekindate, main.checkoutdate , main.status,
			det.customerid 
			FROM Books main LEFT JOIN Bookdetail det on (main.id = det.bookid)
			WHERE main.isDelete = ${isDelete.false}  ORDER BY main.id ASC`;  
			database.query(query, function(error, _data){
				console.log("Error::: ",error)

				database.query(`SELECT * FROM Rooms 
					WHERE isDelete = ${isDelete.false}  ORDER BY id ASC`, (err, _room) => {
						console.log("Err: ", err);

						database.query(`SELECT * FROM Users 
						WHERE isDelete = ${isDelete.false}  ORDER BY id ASC`, (er, _user) => {

							database.query(`SELECT * FROM Payments 
							WHERE isDelete = ${isDelete.false}  ORDER BY id ASC`, (er, _payment) => {

								response.json({
									data: _data,
									room: _room,
									user: _user,
									payment: _payment
								});
								
							})
							
						})
						
					});		
				
			});
		}    

	if(action == 'Add')
	{
		confirm.log("Request body:::: ",request.body);
        const {roomid, userid, paymentid, customerid, } = request.body;	
        
		var query = `
		INSERT INTO Books 
		(roomid, userid, paymentid) 
		VALUES ('${roomid}', '${userid}', '${paymentid}') `;

		database.query(query, function(error, data){
			console.log("DataId::: ", data.inserId)
            console.log("Error::: ",error)
			database.query(`INSERT INTO Bookdetail 
			(bookid, customerid)
			VALUES ('${data.inserId}', '${customerid}')
			`, (err, datadetail) => {
				response.json({
					message : 'Data Added'
				});
			})
			
		});
	}

	if(action == 'fetch_single')
	{
		var id = request.body.id;

		var query = `SELECT main.id, main.fullname, main.citizenIdentityCard,
		main.address, main.phone, main.dateofbirth, main.gender , main.customertype
		FROM Books main
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
		UPDATE Books 
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
		UPDATE Books 
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
    getBook,
    getAllBook,
    
};

