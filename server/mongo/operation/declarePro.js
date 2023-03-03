import { declareProModel } from "..";
import errorCode from '../../errorhandle/errorCode'
//  申报
const createDeclarePro= async(declareProInfo)=>{   
    console.log(declareProInfo);
    try {
        const createP = await declareProModel.create(
            declareProInfo
        )
        let resp = errorCode.Success
        resp.msg = createP
        return resp
    } catch (err) {
        let resp = errorCode.errNodefine
        resp.msg = err
        return resp
    }

}
// 获取当前用户所有的申报列表
const getCProList = async(userId)=>{
    console.log(userId);
    try {
        const createP = await declareProModel.find({createId: userId})
        let resp = errorCode.Success
        resp.msg = createP
        return resp
    } catch (err) {
        let resp = errorCode.errNodefine
        resp.msg = err
        return resp
    }
}
const getJProList = async(userId)=>{
    console.log(userId);
    try {
        const createP = await declareProModel.find({projectMemberId: userId})
        let resp = errorCode.Success
        resp.msg = createP
        return resp
    } catch (err) {
        let resp = errorCode.errNodefine
        resp.msg = err
        return resp
    }
}
export {
    createDeclarePro,
    getCProList,
    getJProList
}