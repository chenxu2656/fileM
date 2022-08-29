import { ElMessage } from 'element-plus'
const errMsgPopup = {
    phoneNumberError: () => {
        ElMessage({
            showClose: true,
            message: 'Oops, 手机号格式错啦！',
            type: 'error',
            duration: "3000"
        })
    }
}
export default errMsgPopup