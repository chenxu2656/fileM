
const parseTimeStamp = (timeStamp) => {
    let date = new Date(parseInt(timeStamp))
    return date.toLocaleString()
}
const formateCtime = (row) => {
    let date = new Date(parseInt(row.ctime))
    return date.toLocaleString()
}
const routerPush = ($router, url) => {
    $router.push(url)
}
const routerBack = ($router) => {
    $router.go(-1)
}
const phonNumberVerify = (phoneNumber) => {
    return /^1[3,4,5,6,7,8,9][0-9]{9}$/.test(phoneNumber.toString());
}
const getVFromLocalStorage = (item,subitem)=>{
    return JSON.parse(localStorage.getItem(item))[subitem]
}
const clearReactive = (obj) => {
    Object.keys(obj).forEach(key => {
        obj[key] = '';
})}
const logOut = ($router, path)=>{
    localStorage.clear()
    routerPush($router,path)
    
}
const roleList = [
    {
        roleName: "superAdmin",
        description: "超级管理员",
        roleCode: 1000
    },
    {
        roleName: "projectAdmin",
        description: "项目管理员",
        roleCode: 2000
    },
    {
        roleName: "websiteAdmin",
        description: "门户网站管理员",
        roleCode: 3000
    },
      {
        roleName: "instituteAdmin",
        description: "学院管理员",
        roleCode: 4000
    }
]
export {
    parseTimeStamp,
    formateCtime,
    routerPush,
    phonNumberVerify,
    routerBack,
    getVFromLocalStorage,
    clearReactive,
    roleList,
    logOut
}