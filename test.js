const randomVerificationCode = ()=>{
    const randomString =  Math.random().toString(10).slice(2,8);
    console.log(randomString);
    return randomString
}
randomVerificationCode()