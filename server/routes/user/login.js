import {createCrddential} from '../../mongo/operation/user'
export default async(req,res)=>{
    const reqData = req.body
    const resp = await createCrddential(reqData)
    res.status(resp.status).json(resp)
}