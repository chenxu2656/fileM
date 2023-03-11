import { instituteModel } from "../index";
import errorCode from '../../errorhandle/errorCode'
const createInstitute = async(req)=>{
    try {
        const createResp = await instituteModel.create({
            name: req.name
        })
        let resp = errorCode.Success
        resp.msg = createResp
        return resp
    } catch (err) {
        console.log(err);
        let resp = errorCode.errNodefine
        resp.msg = err
        return resp
    }
}
const getInstituteList = async()=>{
    try {
        const createResp = await instituteModel.find({ })
        let resp = errorCode.Success
        resp.msg = createResp
        return resp
    } catch (err) {
        console.log(err);
        let resp = errorCode.errNodefine
        resp.msg = err
        return resp
    }
}
const deleteInstitute = async(id)=>{
    try {
        const createResp = await instituteModel.findOneAndDelete({_id: id})
        let resp = errorCode.Success
        resp.msg = createResp
        return resp
    } catch (err) {
        let resp = errorCode.errNodefine
        resp.msg = err
        return resp
    }
}
export {
    createInstitute,
    getInstituteList,
    deleteInstitute
}