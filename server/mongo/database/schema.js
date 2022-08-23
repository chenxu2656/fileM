const userStructure = { 
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
        require: true
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