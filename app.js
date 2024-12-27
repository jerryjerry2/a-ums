const express = require('express');
const fileupload = require('express-fileupload');
const userRoute = require('./routes/user');


const app = express();
app.use(fileupload());
app.set('view engine', 'ejs');

//app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

app.use(userRoute);

app.listen(3000);