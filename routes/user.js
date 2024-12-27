const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();

//Get
router.get('/', userController.getAllUser);
router.get('/about', userController.getAbout);

//Create
router.get('/create', userController.getCreateUser);
router.post('/create', userController.postCreateUser);

//Edit
router.get('/edit/:id', userController.getEditUser);
router.post('/edit', userController.postEditUser);

//Delete
router.get('/delete/:id', userController.deleteUser);

module.exports = router;