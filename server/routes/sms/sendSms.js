const {sendSms} = require('../../sms/tencent/index')
module.exports = async(req,res)=>{
    // const reqBody = req.body
    // const phoneNumber = reqBody.phoneNumber
    const resp = sendSms(['+8615056709773'])
    res.status(200).json(resp)
}