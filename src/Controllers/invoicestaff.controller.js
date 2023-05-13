

const getAllInvoice = async (request, response) => {
    response.render('Invoicestaff', {title : 'Invoices', layout:'layoutstaff'});}


module.exports = {
    
    getAllInvoice
    
};

