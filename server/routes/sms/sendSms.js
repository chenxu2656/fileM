import smsMethod from '../../sms/tencent/index'
import errorHandle from '../../errorhandle'
const sendSms = async(req,res)=>{
    const reqBody = req.body
    const phoneNumber = reqBody.phonenumber
    const resp = await smsMethod.sendSms(phoneNumber)
    console.error(resp);
    res.status(200).json(resp)
}
export default sendSms