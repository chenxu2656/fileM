
var express = require('express');
var router = express.Router();
import createUser from './user/createUser'
import createCrddential from './user/login'
const getUerInfo = (req,res)=>{

}
const updateInfo = (req,res)=>{
    
}
router.post('/register',createUser)
router.post('/login',createCrddential)
router.get('/:id',getUerInfo)
router.put('/:id',updateInfo)
export default router
