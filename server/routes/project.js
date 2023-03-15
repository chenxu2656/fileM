// 创建项目 
import {createProject ,updateProject , getProjectCount,getProjectList,getProjectDetail,deleteProject,getFiles} from '../mongo/operation/project' 
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
    res.status(resp.status).json(resp)
}
const getProjectInfo = async(req,res)=>{
    const id = req.params.id
    let resp = await getProjectDetail(id)
    res.status(resp.status).json(resp)
}
const deletePro = async(req,res)=>{
    const id = req.body.id
    let resp = await deleteProject(id)
    res.status(resp.status).json(resp)
}
const getFileList = async(req,res)=>{
    const id = req.query.id
    let resp = await getFiles(id)
    res.status(resp.status).json(resp)
}
const getCount = async(req,res)=>{
    let resp = await getProjectCount()
    res.status(resp.status).json(resp)
}
var express = require('express');
const router = express.Router();
router.post('/create',createP)
router.get('/list',getProject)
router.get('/detail/:id',getProjectInfo)
router.get('/fileList',getFileList)   // 获取当前项目下 的申报文件
router.post('/delete',deletePro)
router.get('/count',getCount)
export default router