import {smsModel}  from "..";
const storeSmsCode = async(req)=>{
    const dbResp = await smsModel.create(req)
    return dbResp
}
const GetCodeByPhoneNumber = async(phoneNumber)=>{
    const resp = await smsModel.findOne({
        phoneNumber: phoneNumber
    }).limit(1).sort({_id: -1})
    return resp
}
export {
    storeSmsCode,
    GetCodeByPhoneNumber
}