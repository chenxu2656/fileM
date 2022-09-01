
var express = require('express');
var router = express.Router();
import createUser from './user/createUser'
import createCrddential from './user/login'
router.post('/register',createUser)
router.post('/login',createCrddential)
export default router
