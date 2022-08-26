import smsMethod from '../../sms/tencent/index'
const sendSms = async(req,res)=>{
    const reqBody = req.body
    const phoneNumber = reqBody.phonenumber
    const resp = await smsMethod.sendSms(phoneNumber,'verification')
    res.status(resp.status).json(resp)
}
export default sendSms