import {createNews , changeStatus , queryNews, createFolder,getFolderList} from '../mongo/operation/news'
var express = require('express');
var router = express.Router();
const cd = async(req,res)=>{
    const queryList = req.body
    let resp = await createNews(queryList)
    res.status(resp.status).json(resp)
}
const cFolder = async(req,res)=>{
    const queryList = req.body
    let resp = await createFolder(queryList)
    res.status(resp.status).json(resp)
}
const rFolder = async(req,res)=>{
    let resp = await getFolderList()
    res.status(resp.status).json(resp)
}
const ud = async(req,res)=>{
    let resp = await changeStatus(req.body.status, req.body.id)
    res.status(resp.status).json(resp)
}
const rd = async(req,res)=>{
    const {field, value, limit , skip} = req.query
    let resp = await queryNews(field, value, limit , skip)
    res.status(resp.status).json(resp)
}
router.post('/cd',cd)  
router.post('/ud',ud)
router.get('/rd', rd)
router.post('/folder/cd', cFolder)
router.get('/folder', rFolder)
export default router  
     