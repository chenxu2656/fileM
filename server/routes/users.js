import { updateProfile,getProfile } from "../mongo/operation/user";
import {getCProList,getJProList} from '../mongo/operation/declarePro'
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
const getDeclareList = async(req,res)=>{
    const uid = req.query.u
    const join = req.query.j
    let resp = {}
    if (join === 'j') {
        console.log('1');
        resp = await getJProList(uid)
    } else {
        console.log('2');
        resp = await getCProList(uid)
    }
    res.status(resp.status).json(resp)
}
router.post('/register',createUser)  
router.post('/login',createCrddential)
router.get('/proList',getDeclareList)
router.get('/:uid',getUerInfo)   

export default router  
     