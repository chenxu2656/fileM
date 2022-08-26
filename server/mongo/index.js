import {smsCode,userStructure} from './database/schema'
import mongoose from 'mongoose'

const smsSchema = new mongoose.Schema(smsCode,{
    collection: 'sms'
})

export const smsModel = mongoose.model('sms',smsSchema)

const userSchema = new mongoose.Schema(userStructure,{
    collection: 'user'
})

export const userModel = mongoose.model('user',userSchema)