const express = require('express');
require('dotenv').config();


const configViewEngine = require('./config/viewengine.config');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');



const app = express();
//Middlewres
app.use(express.json());
app.use(cookieParser());

// Express Layouts
app.use(expressLayouts);
//config viewengine
configViewEngine(app);

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 86400000 1 day
    }
}));

app.use( express.json() );
app.use( express.urlencoded({ extended: false }) );




//Routes
//app.use('/', require())
// app.use("/", async (req, res) => {
// 	res.render('index', {
// 		layout: true,
//         message: " ABC"
// 	});
// });

const customerRoute = require('./Routes/customer.route');
app.use('/customer', customerRoute);
app.use('/index', require('./Routes/index.route'));


app.use('/customertype', require('./Routes/customertype.route'));

app.use('/room', require('./Routes/room.route'));
app.use('/roomtype', require('./Routes/roomtype.route'));
app.use('/roomservice', require('./Routes/roomservice.route'));

app.use('/book', require('./Routes/book.route'));
app.use('/invoice', require('./Routes/invoice.route'));
//app.use('/', require('./Routes/index.route'));










const PORT = process.env.PORT || 5000;


app.listen(PORT , () => {
    console.log(`SERVER RUNNING http:localhost:${PORT}`);
})

