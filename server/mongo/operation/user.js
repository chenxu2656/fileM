import { userModel } from "..";
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
    const {phoneNumber,name} = loginInfo
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
            'username': name
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
export {
    createUser,
    createCrddential,
    updateProfile,
    getProfile
}