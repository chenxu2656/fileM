import { userModel,adminModel,judgeModel } from "..";
import errorCode from '../../errorhandle/errorCode'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
const createUser = async(userInfo)=>{
    const saltRounds = 10;
    let salt =  await bcrypt.genSalt(saltRounds)
    let pwBcrypt = await bcrypt.hash(userInfo.password,salt)
    try {
        const user = await userModel.create({
            name: userInfo.name,
            phoneNumber: userInfo.phoneNumber,
            password: pwBcrypt,
            studentId: userInfo.studentId,
            role: userInfo.role,
            grade: userInfo.grade,
            college: userInfo.college
        })
        let successInfo = errorCode.Success
        successInfo.msg = user
        return successInfo
    }
    catch(err){
        if (err.code == 11000) {
            return errorCode.SignInfoRepeat
        }else {
            return errorCode.SignInfoFail
        }
    }
}
const createJudgeAccount = async (userInfo)=>{
    const saltRounds = 10;
    let salt =  await bcrypt.genSalt(saltRounds)
    let pwBcrypt = await bcrypt.hash(userInfo.password,salt)
    try {
        const user = await judgeModel.create({
            userName: userInfo.userName,
            phoneNumber: userInfo.phoneNumber,
            loginName: userInfo.loginName,
            password: pwBcrypt,
        })
        let successInfo = errorCode.Success
        successInfo.msg = user
        return successInfo
    }
    catch(err){
        if (err.code == 11000) {
            return errorCode.loginNameRepeat
        }else {
            return errorCode.SignInfoFail
        }
    }
}
const createAdminAccount = async (userInfo)=>{
    const saltRounds = 10;
    let salt =  await bcrypt.genSalt(saltRounds)
    let pwBcrypt = await bcrypt.hash(userInfo.password,salt)
    try {
        const user = await adminModel.create({
            userName: userInfo.userName,
            phoneNumber: userInfo.phoneNumber,
            password: pwBcrypt,
            loginName: userInfo.loginName,
        })
        let successInfo = errorCode.Success
        successInfo.msg = user
        return successInfo
    }
    catch(err){
        if (err.code == 11000) {
            return errorCode.loginNameRepeat
        }else {
            console.log(err);
            return errorCode.SignInfoFail
        }
    }
}
const pwVerify = async(loginInfo)=>{
    const {phoneNumber,pw} = loginInfo
    const userExist = await userModel.findOne({phoneNumber: phoneNumber})
    if (!userExist) {
        return errorCode.userNotExist
    } 
    const pwCorrect =  await bcrypt.compare(pw,userExist.password)
    if (!pwCorrect) {
        return errorCode.pwIncorrect
    }
    return errorCode.Success
}
const storeJwt = async(loginInfo)=>{
    const secretKey = 'user_sys'
    const {phoneNumber} = loginInfo
    const token = jwt.sign(
        {phoneNumber},
        secretKey,
        {
            expiresIn: "7 days"
        }
    )
    return {
        status: 200,
        msg: {
            'token': token,
            'uid': phoneNumber,
        }
    }
}
const createCrddential = async(loginInfo)=>{
    console.log(loginInfo);
    const pw = await pwVerify(loginInfo)
    if (pw.status != 200) {
        return pw
    }
    const token = await storeJwt(loginInfo)
    return token
}

const updateProfile = async(userInfo)=>{
    console.log(userInfo);
    try {
        const createP = await userModel.updateOne({
            id: userInfo._id,
        }, {
                name: userInfo.name,
                phoneNumber: userInfo.phoneNumber,
                password: userInfo.password,
                studentId: userInfo.studentId,
                role: userInfo.role,
                grade: userInfo.grade,
                college: userInfo.college ? userInfo.college:"生物医学工程学院"
        })
        let resp = errorCode.Success
        resp.msg = createP
        return resp
    } catch(err) {
        let resp = errorCode.errNodefine
        resp.msg = err
        return resp
    }
}
const getProfile = async(uid)=>{
    try {
        const createP = await userModel.findOne({
            phoneNumber: uid
        })
        let resp = errorCode.Success
        resp.msg = createP
        return resp
    } catch(err) {
        let resp = errorCode.errNodefine
        resp.msg = err
        return resp
    }
}
const getUserList = async(query)=>{
    const page = query.page  // 页码
    const count = query.page //每一的条数
    try {
        const getResp = await userModel.find()
        console.log(getResp);
        let resp = errorCode.Success
        resp.msg = getResp
        return resp
    }catch (err) {
        let resp = errorCode.errNodefine
        resp.msg = err
        return resp
    }
}
const getAdminList = async(query)=>{
    const page = query.page && 0  // 页码
    const count = query.page && 20 //每一的条数
    try {
        const getResp = await adminModel.find()
        let resp = errorCode.Success
        resp.msg = getResp
        return resp
    }catch (err) {
        let resp = errorCode.errNodefine
        resp.msg = err
        return resp
    }
}
const getJudgeList = async(query)=>{
    const page = query.page  // 页码
    const count = query.page //每一的条数
    try {
        const getResp = await judgeModel.find()
        let resp = errorCode.Success
        resp.msg = getResp
        return resp
    }catch (err) {
        let resp = errorCode.errNodefine
        resp.msg = err
        return resp
    }
}
export {
    createUser,
    createCrddential,
    updateProfile,
    getProfile,
    createAdminAccount,
    createJudgeAccount,
    getUserList,
    getAdminList,
    getJudgeList
}