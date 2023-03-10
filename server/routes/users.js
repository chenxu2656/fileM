import { updateProfile,getProfile } from "../mongo/operation/user";
import {getCProList,getJProList} from '../mongo/operation/declarePro'
import { createAdminAccount,createJudgeAccount,createUser,createCrddential,getUserList,getAdminList,getJudgeList } from "../mongo/operation/user";
var express = require('express');
var router = express.Router();
const createAccount =  async(req,res)=>{
    const reqData = req.body
    const type  = req.query.type
    if (type === 'admin') {
        console.log('1');
        const resp = await createAdminAccount(reqData)
        res.status(resp.status).json(resp)
    } else if (type === 'judge') {
        const resp = await createJudgeAccount(reqData)
        res.status(resp.status).json(resp)
    } else {
        const resp = await createUser(reqData)
        res.status(resp.status).json(resp)
    }
   
}
const createToken = async(req,res)=>{
    const reqData = req.body
    const resp = await createCrddential(reqData)
    res.status(resp.status).json(resp)
}
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
    if (join === 'j') {   // 参与的项目
        resp = await getJProList(uid)
    } else { //创建的项目
        resp = await getCProList(uid)
    }
    res.status(resp.status).json(resp)
}
const getUsers = async(req,res)=>{
    const type = req.query.type
    if (type === 'admin') {
        const resp = await getAdminList(req.query)
        res.status(resp.status).json(resp)
    } else if (type === 'judge') {
        const resp = await getJudgeList(req.query)
        res.status(resp.status).json(resp)
    } else {
        const resp = await getUserList(req.query)
        res.status(resp.status).json(resp)
    }
   
}
router.post('/register',createAccount)  
router.post('/login',createToken)
router.get('/proList',getDeclareList)
router.get('/userList',getUsers)
router.get('/userInfo/:uid',getUerInfo)   

export default router  
     