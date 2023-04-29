const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')
const indexController = require('../controllers/indexController');

router.post('/tasks/:token',authController.authMiddleware, indexController.tasks);
router.post('/addtask/:token',authController.authMiddleware,indexController.addtask);
router.post('/changetaskstatus/:token',authController.authMiddleware,indexController.changetaskstatus);

module.exports = router;