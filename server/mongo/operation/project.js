import { projectModel } from "..";
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
const getProjectList = async(reqInfo)=>{
    try {
        let responseInfo = []
        if (JSON.stringify(reqInfo) === '{}') {
            responseInfo = await projectModel.find()
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
export {
    createProject,
    getProjectList
}