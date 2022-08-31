import { ElMessage } from 'element-plus'
const errMsgPopup = {
    phoneNumberError: () => {
        ElMessage({
            showClose: true,
            message: 'Oops, 手机号格式错啦！',
            type: 'error',
            duration: "3000"
        })
    },
    notFillAllError: () => {
        ElMessage({
            showClose: true,
            message: 'Oops, 您有信息没填完，填完后继续！',
            type: 'error',
            duration: "3000"
        })
    }
}
export default errMsgPopup