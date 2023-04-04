import { newsModel , folderModel } from "..";
import errorCode from '../../errorhandle/errorCode'
export const createFolder = async(folderInfo)=>{
    console.log(folderInfo);
    const info = {
        name: folderInfo.name
    }
    let folder = {}
    try {
        if (folderInfo._id) {
            // 如果有id 表示更新
            folder = await folderModel.findOneAndUpdate({
                _id: folderInfo._id
            }, info, {
                new: true
            })
        } else {
            folder = await folderModel.create(info)
        }
        let successInfo = errorCode.Success
        successInfo.msg = folder
        return successInfo
    }
    catch(err){
        console.log(err);
        return errorCode.SignInfoFail
    }
}
export const getFolderList = async() =>{
    try {
        const folderList = await folderModel.find({})
        let successInfo = errorCode.Success
        successInfo.msg = folderList
        return successInfo
    }
    catch(err){
        console.log(err);
        return errorCode.SignInfoFail
    }
}
export const createNews = async(newsInfo)=>{
    const info = {
        title: newsInfo.title,
        content: newsInfo.content,
        folderId: newsInfo.folderId,
        status: newsInfo.status
    }
    let news = {}
    try {
        if (newsInfo._id) {
            // 如果有id 表示更新
            news = await newsModel.findOneAndUpdate({
                _id: newsInfo._id
            }, info, {
                new: true
            })
        } else {
            news = await newsModel.create(info)
        }
        let successInfo = errorCode.Success
        successInfo.msg = news
        return successInfo
    }
    catch(err){
        console.log(err);
        return errorCode.SignInfoFail
    }
}
export const changeStatus = async(status , id)=>{
    try {
        const news = await newsModel.findOneAndUpdate({
            _id: id
        },{
            status: status
        }, {
            new: true
        })
        let successInfo = errorCode.Success
        successInfo.msg = news
        return successInfo
    }
    catch(err){
        console.log(err);
        return errorCode.SignInfoFail
    }
}
// 根据条件获取文章列表
export const queryNews = async(field, value, limit , skip) =>{
    let news = {}
    console.log(field, value, limit , skip);
    try {
        if (limit) {
            news = await newsModel.find({
                [field]: value
            }).limit(limit).skip( skip && 0).sort({
                '_id': '-1'
            })
        } else {
            console.log('1111')
            news = await newsModel.find({
                [field]: value
            }).sort({
                '_id': '-1'
            })
        }

        let successInfo = errorCode.Success
        successInfo.msg = news
        return successInfo
    }
    catch(err){
        console.log(err);
        return errorCode.SignInfoFail
    }
}
export const deleteNews = async(id)=>{
    if (!id) {
        let resp = errorCode.errNodefine
        resp.msg = 'id是空的'
        return resp
    }
    try {
        let responseInfo =  await newsModel.findOneAndDelete({_id: id})
        let resp = errorCode.Success
        resp.msg = responseInfo
        return resp
    }catch(err){
        let resp = errorCode.errNodefine
        resp.msg = err
        return resp
    }
}
export const deleteFolder = async(id)=>{
    if (!id) {
        let resp = errorCode.errNodefine
        resp.msg = 'id是空的'
        return resp
    }
    try {
        let responseInfo =  await folderModel.findOneAndDelete({_id: id})
        let resp = errorCode.Success
        resp.msg = responseInfo
        return resp
    }catch(err){
        let resp = errorCode.errNodefine
        resp.msg = err
        return resp
    }
}