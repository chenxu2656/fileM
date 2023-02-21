import {smsCode,userStructure,project} from './database/schema'
import mongoose from 'mongoose'

const smsSchema = new mongoose.Schema(smsCode,{
    collection: 'sms'
})

export const smsModel = mongoose.model('sms',smsSchema)

const userSchema = new mongoose.Schema(userStructure,{
    collection: 'user'
})
// userSchema.add({
//     college: "String"
// })
export const userModel = mongoose.model('user',userSchema)

const projectSchema = new mongoose.Schema(project,{
    collection: 'project'
})

export const projectModel = mongoose.model('project',projectSchema)