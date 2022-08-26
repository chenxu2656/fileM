import {createUser} from '../../mongo/operation/user'
export default async(req,res)=>{
    const reqData = req.body
    const resp = await createUser(reqData)
    res.status(resp.status).json(resp)
}