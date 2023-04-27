const getInvoice = async (request, response) => {
    console.log("getInvoice")
    response.render('Invoice', {title : 'Invoice Information'});
}

module.exports = {
    getInvoice,
    
};

