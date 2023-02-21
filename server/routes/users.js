import { updateProfile,getProfile } from "../mongo/operation/user";
var express = require('express');
var router = express.Router();
import createUser from './user/createUser'
import createCrddential from './user/login'

const getUerInfo = async (req,res)=>{
    const uid = req.params.uid
    let resp = await getProfile(uid)
    res.status(resp.status).json(resp)
}
const updateInfo = async (req,res)=>{
    const reqBody = req.body
    
    let resp  = await updateProfile(reqBody)
    res.status(resp.status).json(resp)
}
router.post('/register',createUser)
router.post('/login',createCrddential)
router.get('/:uid',getUerInfo)
router.put('/',updateInfo)
export default router
     