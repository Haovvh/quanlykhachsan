
const getCustomerByStaff = async (request, res) => {
    console.log("getcustomer")
    res.render('customerstaff', {title : 'Customers', layout:'layoutstaff'});
}

module.exports = {    
	getCustomerByStaff
};

