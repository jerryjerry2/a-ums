const express = require('express');
const {requireAuth} = require('../middlewares/auth');
const EmployeeController = require('../controllers/employee');

const router = express.Router();

//Get
router.get('/', requireAuth, EmployeeController.getAllEmployee);
router.get('/about',requireAuth, EmployeeController.getAbout);

//Create
router.get('/create',requireAuth,  EmployeeController.getCreateEmployee);
router.post('/create', EmployeeController.postCreateEmployee);

//Edit
router.get('/edit/:id', requireAuth,EmployeeController.getEditEmployee); 
router.post('/edit', EmployeeController.postEditEmployee);

//Delete
router.get('/delete/:id', EmployeeController.deleteEmployee);

module.exports = router;