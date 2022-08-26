
var express = require('express');
var router = express.Router();
import createUser from './user/createUser'
router.post('/',createUser)

export default router
