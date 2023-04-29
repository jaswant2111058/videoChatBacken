const express = require('express');
const router = express.Router();
const { body, query, param } = require('express-validator');
const authController = require('../controllers/authController');
const { validateRequest } = require('../utils/validator');

router.post('/register',
  [
    body('username').exists().withMessage('name is required'),
    body('password').exists().withMessage('Password is required'),
    body('email').exists().withMessage('email is required'),
   ], 
  
  authController.register
);
router.post('/login',
  [
    body('email').exists().withMessage('email is required'),
    body('password').exists().withMessage('Password is required'),
  ],
 
  authController.login
);

router.post('/emailVerify',
  [
    body("email").exists().withMessage("email is required"),
    body("otp").exists().withMessage("otp is required"),
  ],
  
  authController.emailVerify
);

// router.post('/password/reset/:token',
//   [
//     body("new_password").exists().withMessage("New password is required"),
//   ],
//   validateRequest,
//   authController.resetPassword
// );

module.exports = router;
