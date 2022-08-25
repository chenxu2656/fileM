require('babel-register')
// https://blog.csdn.net/qq_21275565/article/details/108253450?spm=1001.2101.3001.6661.1&utm_medium=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-108253450-blog-84821679.pc_relevant_multi_platform_featuressortv2dupreplace&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-108253450-blog-84821679.pc_relevant_multi_platform_featuressortv2dupreplace&utm_relevant_index=1
//nodemon --exec babel-node --presets env app.js
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// // 连接数据库
require('./mongo/connect')
// // 用户操作
// const User = require('./routes/users');
import Sms from './routes/sms.js'
// const Sms = require('./routes/sms')
// // 文章操作
// const Article = require('./routes/article')
// // 文件夹操作

// const Folder = require('./routes/folder')

// const Tags = require('./routes/tags')
// const Qiniu = require('./routes/qiniu')
// const Setting = require('./routes/setting')

// const NavItem = require('./routes/navItem')

// const FrontDesk = require('./routes/frontDesk')
// const errhandle = require('./middleware/errhandle')
const app = express()
// 允许跨域 否则 前台请求可能会报错
// app.all('*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", req.headers.origin);
//     // res.header("Access-Control-Allow-Origin", '*');
//     res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
//     res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//     res.header("Access-Control-Allow-Credentials","true");
//     next()
//   });
// app.use(logger('dev'));
// // 处理json数据
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
// token 校验中间件
// app.use(require('./middleware/tokenCheck'))
// app.use('/api/user', User);
app.use('/api/sms', Sms);
// app.use('/api/article',Article)
// app.use('/api/folder',Folder)
// app.use('/api/tags',Tags)
// app.use('/api/qiniu',Qiniu)
// app.use('/api/setting',Setting)
// app.use('/api/navItem',NavItem)
// app.use('/api/front',FrontDesk)
// app.use(errhandle)
app.listen(4000, console.log("application is start at port 4000"))
// export default app
