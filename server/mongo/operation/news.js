import { newsModel , folderModel } from "..";
import errorCode from '../../errorhandle/errorCode'
export const createFolder = async(folderInfo)=>{
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

export const createNews = async(newsInfo)=>{
    const info = {
        title: newsInfo.name,
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
            }).limit(limit).skip( skip && 0).sort() 
        } else {
            news = await newsModel.find({
                [field]: value
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