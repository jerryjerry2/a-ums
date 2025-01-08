const jwt = require('jsonwebtoken');
const con = require('../config/db');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    //console.log('Token in middleware : ', token);
    if(token){
        jwt.verify(token, 'ant secret', (err, decodedToken) => {
            if(err){
                res.redirect('/signin');
            }else{
                //console.log(decodedToken);
                next();
            }
        })
    }else{
        res.redirect('/signin');
    }
}

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    console.log(req.url);

    if(token){
        jwt.verify(token, 'ant secret', (err, decodedToken) => {
            if(err){
                res.locals.user = null;
                res.redirect('/signin');
            }else{
                con.query('select * from user where id = ?', decodedToken.id, (err, data) => {
                    if(err){ 

                    }
                    console.log('Check user : ', data);
                    res.locals.user = data;
                    next();
                })
                
            }
        })
    }else{
        res.locals.user = null;
        next();
    }
}

module.exports = {
    requireAuth,
    checkUser
}