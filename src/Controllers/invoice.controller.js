

const getAllInvoice = async (request, response) => {
    console.log("getInvoice")
    response.render('Invoice', {title : 'Invoices', role:'admin'});}


module.exports = {
    
    getAllInvoice
    
};

