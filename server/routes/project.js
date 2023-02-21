// 创建项目 
import {createProject ,updateProject ,  getProjectList,getProjectDetail} from '../mongo/operation/project' 
const createP = async(req,res)=>{
    const reqBody = req.body
    let resp = {}
    if (reqBody._id) {
        // 更新项目
        resp = await updateProject(reqBody)
    } else {
        resp  = await createProject(reqBody)
    }
    // 
    res.status(resp.status).json(resp)
}
const getProject = async(req,res)=>{
    const queryList = req.query
    let resp = await getProjectList(queryList)
    
}
const getProjectInfo = async(req,res)=>{
    const id = req.params.id
    let resp = await getProjectDetail(id)
    res.status(resp.status).json(resp)
}
var express = require('express');
const router = express.Router();
router.post('/create',createP)
router.get('/list',getProject)
router.get('/detail/:id',getProjectInfo)
export default router