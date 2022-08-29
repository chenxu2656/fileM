
    const parseTimeStamp = (timeStamp)=>{
        let date = new Date(parseInt(timeStamp))
        return date.toLocaleString()
    }
    const formateCtime = (row)=>{
        let date = new Date(parseInt(row.ctime))
        return date.toLocaleString()
    }
    const routerPush = ($router,url)=>{
        $router.push(url)
    }
    const phonNumberVerify = (phoneNumber)=>{
        return /^1[3,4,5,6,7,8,9][0-9]{9}$/.test(phoneNumber.toString());
    }

export {
    parseTimeStamp,
    formateCtime,
    routerPush,
    phonNumberVerify
}