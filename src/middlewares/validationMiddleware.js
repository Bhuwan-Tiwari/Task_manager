const { body, validationResult } = require('express-validator');
const {StatusCodes} = require('http-status-codes')

const validateUserRegistration = [
  
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address.'),
  
 
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long.')
    .matches(/\d/)
    .withMessage('Password must contain at least one number.')
    .matches(/[\W_]/)
    .withMessage('Password must contain at least one special character.'),
  

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports=validateUserRegistration