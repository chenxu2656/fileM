var express = require('express');
const router = express.Router();
import {createInstitute,getInstituteList,deleteInstitute} from '../mongo/operation/institute'
const create = async (req,res)=>{
    const requestInfo = req.body
    let resp = await createInstitute(requestInfo)
    res.status(resp.status).json(resp)
}
const getINstituteList = async (req,res)=>{
    let resp = await getInstituteList()
    res.status(resp.status).json(resp)
}
const deleteIns = async (req,res)=>{
    let resp = await deleteInstitute(req.body.id)
    res.status(resp.status).json(resp)
}
router.post('/',create)
router.get('/',getINstituteList)
router.post('/delete',deleteIns)
export default router

