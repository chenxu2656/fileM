import {smsCode,userStructure,project,declarePro,AdminAccount,JudgeAccount, institute} from './database/schema'
import mongoose from 'mongoose'
const instituteSchema =  mongoose.Schema(institute,{
    collection: 'institute'
})
export const instituteModel = mongoose.model('institute',instituteSchema)
const smsSchema = new mongoose.Schema(smsCode,{
    collection: 'sms'
})

export const smsModel = mongoose.model('sms',smsSchema)

const userSchema = new mongoose.Schema(userStructure,{
    collection: 'user'
})
export const userModel = mongoose.model('user',userSchema)
const adminSchema = new mongoose.Schema(AdminAccount,{
    collection: 'adminUser'
})
export const adminModel = mongoose.model('adminUser',adminSchema)
const judgeSchema = new mongoose.Schema(JudgeAccount,{
    collection: 'judgeUser'
})
export const judgeModel = mongoose.model('judgeUser',judgeSchema)
const projectSchema = new mongoose.Schema(project,{
    collection: 'project'
})

export const projectModel = mongoose.model('project',projectSchema)

const declareProSchema = new mongoose.Schema(declarePro,{
    collection: 'declarePro'
})

export const declareProModel = mongoose.model('declarePro',declareProSchema)
// adminSchema.add({
//     loginName: "String"
// })
// adminSchema.add({
//     loginName: "String"
// })

