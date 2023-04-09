


const index = async (req, res) =>{

    console.log("Indexxx ::::")

    res.render('index', {
        message: "index"
    })
}

module.exports = {
    index
};

