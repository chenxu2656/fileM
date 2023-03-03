// 创建项目 
import {createDeclarePro} from '../mongo/operation/declarePro' 
const createP = async(req,res)=>{
    let reqBody = req.body
    const memList = reqBody.projectMember
    let memIdList = []
    memList.forEach(element => {
        memIdList.push(element._id)
    });
    reqBody.projectMemberId = memList
    let resp = {}
    // if (reqBody._id) {
    //     // 更新项目
    //     resp = await updateProject(reqBody)
    // } else {
    resp  = await createDeclarePro(reqBody)
    // }
    // 
    res.status(resp.status).json(resp)
}

const express = require('express');
const router = express.Router();
router.post('/create',createP)
export default router