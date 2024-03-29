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
const getUserCount = async(type)=>{
    try {
        let resp = {}
        switch(type){
            case 'admin': {
                resp = await adminModel.count({})
                break
            }
            case 'judge': {
                resp = await judgeModel.count({})
                break
            }
            default: {
                resp = await userModel.count({})
                break
            }
        }
        let successInfo = errorCode.Success
        successInfo.msg = resp
        return successInfo
    } catch (err) {
        console.log(err);
        return errorCode.errNodefine
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
    console.log(userInfo);
    try {
        const user = await adminModel.create({
            userName: userInfo.userName,
            phoneNumber: userInfo.phoneNumber,
            password: pwBcrypt,
            loginName: userInfo.loginName,
            role: userInfo.role,
            collage: userInfo.collage 
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
const getRoleOfAdmin = async(phoneNumber)=>{
    try {
        const resp = await adminModel.findOne({
            phoneNumber: phoneNumber
        })
        return resp
    }catch (err) {
        console.log(err);
    }

}
const storeJwt = async(loginInfo)=>{
    const secretKey = 'user_sys'
    console.log(loginInfo);
    const {phoneNumber,platform} = loginInfo
    let resp = {}
    if (platform === 'admin') {
        // 生成对应的权限，并存储在token里面
        // 获取身份
        resp = await getRoleOfAdmin(phoneNumber)
    } 
    const token = jwt.sign(
        {
            phoneNumber: phoneNumber,
            platform: platform,
            role: resp.role
        },
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
    const pw = await pwVerify(loginInfo)
    if (pw.status != 200) {
        return pw
    }
    const token = await storeJwt(loginInfo)
    return token
}
const createAdminCredential = async(loginInfo)=>{
    const {phoneNumber,pw} = loginInfo
    const userExist = await adminModel.findOne({phoneNumber: phoneNumber})
    if (!userExist) {
        return errorCode.userNotExist
    }
    const pwCorrect =  await bcrypt.compare(pw,userExist.password)
    if (!pwCorrect) {
        return errorCode.pwIncorrect
    }
    const token = await storeJwt(loginInfo)
    return token
}
const createJudgeCredential = async(loginInfo)=>{
    const {phoneNumber,pw} = loginInfo
    const userExist = await judgeModel.findOne({phoneNumber: phoneNumber})
    if (!userExist) {
        return errorCode.userNotExist
    }
    const pwCorrect =  await bcrypt.compare(pw,userExist.password)
    if (!pwCorrect) {
        return errorCode.pwIncorrect
    }
    const token = await storeJwt(loginInfo)
    return token
}

const updateProfile = async(userInfo)=>{
    try {
        const createP = await userModel.updateOne({
            _id: userInfo._id,
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
const updateJudgeAccount = async(userInfo)=>{
    let info = { }
    if (userInfo.password == '') {
        // 不更新密码
        info = {
            userName: userInfo.userName,
            loginName: userInfo.loginName,
            phoneNumber: userInfo.phoneNumber,
        }
    } else {
        const saltRounds = 10;
        let salt =  await bcrypt.genSalt(saltRounds)
        let pwBcrypt = await bcrypt.hash(userInfo.password,salt)
        info = {
            userName: userInfo.userName,
            loginName: userInfo.loginName,
            password: pwBcrypt,
            phoneNumber: userInfo.phoneNumber,
        }
    }
    try {
        const createP = await judgeModel.findOneAndUpdate({
            _id: userInfo._id,
        }, info, {
            new: true
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

const updateAdminAccount = async(userInfo)=>{
    let info = { }
    console.log(userInfo);
    if (userInfo.password == '') {
        // 不更新密码
        info = {
            userName: userInfo.userName,
            loginName: userInfo.loginName,
            phoneNumber: userInfo.phoneNumber,
            role: userInfo.role,
            collage:  userInfo.collage 
        }
    } else {
        const saltRounds = 10;
        let salt =  await bcrypt.genSalt(saltRounds)
        let pwBcrypt = await bcrypt.hash(userInfo.password,salt)
        info = {
            userName: userInfo.userName,
            loginName: userInfo.loginName,
            password: pwBcrypt,
            phoneNumber: userInfo.phoneNumber,
            role: userInfo.role,
            collage:  userInfo.collage 
        }
    }
    try {
        const createP = await adminModel.findOneAndUpdate({
            _id: userInfo._id,
        }, info, {
            new: true
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
const deleteUser = async(req)=>{
    const {id , type} = req
    if (!id) {
        let resp = errorCode.errNodefine
        resp.msg = 'id是空的'
        return resp
    }
    try {
        let responseInfo = {}
        if (type === 'admin') {
            responseInfo =  await adminModel.findOneAndDelete({_id: id})
        } else if (type === 'judge') {
            responseInfo =  await judgeModel.findOneAndDelete({_id: id})
        } else {
            responseInfo =  await userModel.findOneAndDelete({_id: id})
        }
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
    createUser,
    createCrddential,
    createAdminCredential,
    createJudgeCredential,
    updateProfile,
    getProfile,
    createAdminAccount,
    createJudgeAccount,
    getUserList,
    getAdminList,
    getJudgeList,
    deleteUser,
    updateJudgeAccount,
    updateAdminAccount,
    getUserCount
}

