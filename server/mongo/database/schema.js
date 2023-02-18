export const userStructure = { 
    name: {
        type: String,
        require: true
    },
    phoneNumber: {
        type: String,
        require: true,
        unique: true   // 保证邮箱唯一
    },
    password: {
        type: String,
        require: true
    },
    studentId: {
        type: Number,
        require: true,
        unique: true
    },
    systemrole: {
        type: String,
        default: "user"    // superadmin | admin |  user
    },
    role: {
        type: String,
        default: "本科生", //本科生 ｜ 研究生 ｜ 老师
    },
    grade: {
        type: Number,
        default: '2022' //入学年份
    }
}
export const smsCode = {
    phoneNumber: {
        type: String,
        require: true
    },
    verificationCode: {
        type: Number,
        require: true
    },
    SerialNo: {
        type: String,
        require: true
    }
} 
export const project = {
    projectName: {
        type: String,
        require: true
    },
    sTime: {
        type: Date,
    },
    eTime: {
        type: Date
    },
    contact: {
        type: String
    },
    contactInfo: {
        type: String
    },
    relatedNewsId: {
        type: String
    },
    createId: {
      type: String  
    }
} 