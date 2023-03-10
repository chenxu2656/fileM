import smsMethod from '../../sms/tencent/index'
const smsVerify = async(req,resp)=>{
    const reqBody = req.body
    
    const verifiy = await smsMethod.codeVerify(reqBody)
    resp.status(verifiy.status).json(verifiy)
}
export default smsVerify