// 创建项目 
import {createProject , getProjectList} from '../mongo/operation/project' 
const createP = async(req,res)=>{
    const reqBody = req.body
    let resp = await createProject(reqBody)
    res.status(resp.status).json(resp)
}
const getProject = async(req,res)=>{
    const queryList = req.query
    let resp = await getProjectList(queryList)
    res.status(resp.status).json(resp)
}
var express = require('express');
const router = express.Router();
router.post('/create',createP)
router.get('/list',getProject)

export default router