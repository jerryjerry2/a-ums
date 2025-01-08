const express = require('express');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');

const employeeRoute = require('./routes/employee');
const authRoute = require('./routes/auth');
const {checkUser} = require('./middlewares/auth');

const app = express();
app.use(cookieParser());
app.use(fileupload());

app.set('view engine', 'ejs'); 

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

app.get('*', checkUser);
app.use(employeeRoute);
app.use(authRoute);


app.listen(3000);