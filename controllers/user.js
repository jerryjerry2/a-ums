const con = require('../config/db');

const getAllUser = (req, res) => {
    con.query('select * from users', (err, data) => {
        if(err){
            console.log(err);
        }
        
        console.log(data);
        res.render('index', {users : data});
    });
}

const getAbout = (req, res) => {
    res.render('about');
}

const getCreateUser = (req, res) => {
    res.render('create');
}

const postCreateUser = (req, res) => {
    console.log(req.files);

    let sampleFile = req.files.avarta;
    let sampleFileName = Date.now() + sampleFile.name
    let uploadPath = './public/upload/' + sampleFileName;
    console.log(Date.now());

    sampleFile.mv(uploadPath, (err) => {
        if(err){
            console.log(err);
        }
        console.log('Sccuess');
    })

    console.log(req.body);
    let sql = "INSERT INTO `users`(`name`, `authorID`, `categoryID`) VALUES (?, ?, ?)";
    let arrData = [req.body.name, 0, 0];
    con.query(sql, arrData, (err, data) => {
        if(err){
            console.log(err);
        }

        res.redirect('/');
    });
}

const deleteUser = (req, res) => {
    console.log('route delete');
    console.log(req.params);
    con.query('DELETE FROM `users` WHERE id = ?', req.params.id, (err, data) => {
        if(err){
            console.log(err);
        }

        res.redirect('/');
    })
}

const getEditUser = (req, res) => {
    console.log(req.params);
    con.query('select * from users where id = ?', req.params.id, (err, data) => {
        if(err){
            console.log(err);
        }

        console.log(data);
        res.render('edit', {result : data});
    });
}

const postEditUser = (req, res) => {
    console.log(req.body);
    let body = req.body;
    let sql = "UPDATE `users` SET `fullname`= ?,`email`=?,`age`=? WHERE id = ?";
    let myarr = [body.name, body.email, body.age, body.id];
    con.query(sql, myarr, (err, data) => {
        if(err){
            console.log(err);
        }

        res.redirect('/');
    })
};


module.exports = {
    getAllUser,
    getAbout,
    getCreateUser,
    postCreateUser,
    deleteUser,
    getEditUser,
    postEditUser
}