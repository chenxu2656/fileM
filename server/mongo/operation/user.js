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
            grade: userInfo.grade
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
        msg: token
    }
}
const createCrddential = async(loginInfo)=>{
    const pw = await pwVerify(loginInfo)
    if (pw.status != 200) {
        console.log(pw);
        return 
    }
    const token = storeJwt(loginInfo)
    return token
}

export {
    createUser,
    createCrddential
}