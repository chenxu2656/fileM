import { Schema } from "mongoose"

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
    },
    college: {
        type: String
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
export const declarePro = {
    projectName: {
        type: String,
        require: true
    },
    Grouping: {
        type: String   //创意组 创业组 红旅组 等， 根据项目设定而定
    },
    projectSummary: {
        type: String,
        require: true
    },
    projectStage: {  // 项目进展  创意阶段 已注册公司 
        type: String,
        require: true
    },
    attachmentList: {
        bp: {
            type: String,
        },
        ppt: {
            type: String
        },
        video: {
            type: String
        }
    },
    projectId: {
        type: Schema.Types.ObjectId
    },
    createName: {
        type: String  // 创建者
    },
    createStuId: {
        type: String  // 学号
    },
    createStuPhone: {
        type: String  // 创建者手机号
    },
    createId: {
        type: Schema.Types.ObjectId   // 创建者
    },
    projectMember: {
        type: [{}]   // 项目成员
    },
    projectMemberId: {
        type: [Schema.Types.ObjectId]  
    },
    teacher: {
        type: [Object]   // 指导老师
    },
    otherInfo: {
        patent: {
            type: [Object]
        },
        cpcc: {
            type: [Object]
        },
        paper: {
            type: [Object]
        },
        award: {
            type: [Object]
        }

    },
    status: {
        type: String    // 草稿 正式发布
    }
}