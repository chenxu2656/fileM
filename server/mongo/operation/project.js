import { projectModel,declareProModel } from "..";
import errorCode from '../../errorhandle/errorCode'
const createProject = async(projectInfo)=>{
    try {
        const createP = await projectModel.create({
            projectName: projectInfo.projectName,
            sTime: projectInfo.sTime,
            eTime: projectInfo.eTime,
            contact: projectInfo.contact,
            contactInfo: projectInfo.contactInfo,
            relatedNewsId: projectInfo.relatedNewsId,
            createId: projectInfo.createId
        })
        let resp = errorCode.Success
        resp.msg = createP
        return resp
    } catch (err) {
        let resp = errorCode.errNodefine
        resp.msg = err
        return resp
    }

}
const updateProject = async(projectInfo)=>{
    try {
        const createP = await projectModel.updateOne({id: projectInfo._id},{
            projectName: projectInfo.projectName,
            sTime: projectInfo.sTime,
            eTime: projectInfo.eTime,
            contact: projectInfo.contact,
            contactInfo: projectInfo.contactInfo,
            relatedNewsId: projectInfo.relatedNewsId,
            createId: projectInfo.createId
        })
        let resp = errorCode.Success
        resp.msg = createP
        return resp
    } catch (err) {
        let resp = errorCode.errNodefine
        resp.msg = err
        return resp
    }
}
const getProjectList = async(reqInfo)=>{
    try {
        let responseInfo = []
        if (JSON.stringify(reqInfo) === '{}') {
            responseInfo = await projectModel.find().sort({
                "_id": -1
            })
        }
        console.log(responseInfo);
        let resp = errorCode.Success
        resp.msg = responseInfo
        return resp
    }catch(err){
        let resp = errorCode.errNodefine
        resp.msg = err
        return resp
    }
}
const getProjectDetail = async(id)=>{
    if (!id) {
        let resp = errorCode.errNodefine
        resp.msg = 'id是空的'
        return resp
    }
    console.log(id);
    try {
        let responseInfo =  await projectModel.findOne({id: id})
        let resp = errorCode.Success
        resp.msg = responseInfo
        return resp
    }catch(err){
        let resp = errorCode.errNodefine
        resp.msg = err
        return resp
    }
}
const deleteProject = async(id)=>{
    if (!id) {
        let resp = errorCode.errNodefine
        resp.msg = 'id是空的'
        return resp
    }
    try {
        let responseInfo =  await projectModel.findOneAndDelete({id: id})
        let resp = errorCode.Success
        resp.msg = responseInfo
        return resp
    }catch(err){
        let resp = errorCode.errNodefine
        resp.msg = err
        return resp
    }
}
const getFiles = async(id)=>{
    if (!id) {
        let resp = errorCode.errNodefine
        resp.msg = 'id是空的'
        return resp
    }
    try {
        let responseInfo =  await declareProModel.find({projectId: id})
        let resp = errorCode.Success
        resp.msg = responseInfo
        return resp
    }catch(err){
        let resp = errorCode.errNodefine
        resp.msg = err
        return resp
    }
}
export {
    createProject,
    getProjectList,
    updateProject,
    getProjectDetail,
    deleteProject,
    getFiles
}