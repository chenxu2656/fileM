import * as errorCode from './errorCode'

const errorHandle = (code)=>{
    return errorCode[code]
}
export default errorHandle