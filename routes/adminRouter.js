const express = require('express');
const router = express.Router();
const { body, query, param } = require('express-validator');
const adminController = require('../controllers/authController');
const { validateRequest } = require('../utils/validator');

router.post('/admin/login',
  [
    body('email').exists().withMessage('email is required'),
    body('password').exists().withMessage('Password is required'),
  ],
  adminController.adminLogin
);



module.exports = router;
