const timeStampSecond = ()=>{
    return parseInt((new Date()).getTime()/1000).toString()
}
const randomVerificationCode = ()=>{
    const randomString =  Math.random().toString(10).slice(2,8);
    return randomString
}
module.exports = {
    timeStampSecond,
    randomVerificationCode
}