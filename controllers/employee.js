const con = require('../config/db');
const fs = require('fs');
const vEmployee = require('../validation/employee');

const getAllEmployee = async (req, res) => {
    con.query('select * from employee', (err, data) => {
        if(err){
            console.log(err);
        }
        
        res.render('employee/index', {employee : data});
    });
}

const getAbout = (req, res) => {
    res.render('about');
}

const getCreateEmployee = (req, res) => {
    res.render('employee/create');
}

const postCreateEmployee = (req, res) => {
    const { error, value } = vEmployee(req.body);
    if(error){
        res.send(error);
        return;
    }
    
    let sampleFile = req.files.avarta;
    let sampleFileName = Date.now() + sampleFile.name
    let uploadPath = './public/upload/' + sampleFileName;

    sampleFile.mv(uploadPath, (err) => {
        if(err){
            console.log(err);
        }
        console.log('Sccuess');
    })

    let sql = "INSERT INTO `employee`(`fullname`, `email`, `age`, `avarta`) VALUES (?, ?, ?, ?)";
    let arrData = [req.body.name, req.body.email, req.body.age, sampleFileName];
    con.query(sql, arrData, (err, data) => {
        if(err){
            console.log(err);
        }

        res.redirect('/');
    });
}

const deleteEmployee = (req, res) => {
    // console.log('route delete');
    // console.log(req.params);
    con.query('DELETE FROM `employee` WHERE id = ?', req.params.id, (err, data) => {
        if(err){
            console.log(err);
        }

        res.redirect('/');
    })
}

const getEditEmployee = (req, res) => {
    //console.log(req.params);
    con.query('select * from employee where id = ?', req.params.id, (err, data) => {
        if(err){
            console.log(err);
        }

        //console.log(data);
        res.render('employee/edit', {result : data});
    });
}

const postEditEmployee = (req, res) => {
    console.log(req.body);
    console.log(req.files);
    let body = req.body;
    let file;
    if(!req.files){
        file = body.old_img;
    }else{
        let sampleFile = req.files.avarta;
        let sampleFileName = Date.now() + sampleFile.name
        let uploadPath = './public/upload/' + sampleFileName;
        //console.log(Date.now());

        sampleFile.mv(uploadPath, (err) => {
            if(err){
                console.log(err);
            }
            fs.unlinkSync('./public/upload/' + body.old_img);
        })
        file = sampleFileName;
    }
    
    let sql = "UPDATE `employee` SET `fullname`= ?,`email`=?,`age`=?, `avarta`=? WHERE id = ?";
    let myarr = [body.name, body.email, body.age, file, body.id];
    con.query(sql, myarr, (err, data) => {
        if(err){
            console.log(err);
        }

        res.redirect('/');
    })
};


module.exports = {
    getAllEmployee,
    getAbout,
    getCreateEmployee,
    postCreateEmployee,
    deleteEmployee,
    getEditEmployee,
    postEditEmployee
}