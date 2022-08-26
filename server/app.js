require('babel-register')
// how to use import and export in node.js & express 
// https://blog.csdn.net/qq_21275565/article/details/108253450?spm=1001.2101.3001.6661.1&utm_medium=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-108253450-blog-84821679.pc_relevant_multi_platform_featuressortv2dupreplace&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-108253450-blog-84821679.pc_relevant_multi_platform_featuressortv2dupreplace&utm_relevant_index=1
//nodemon --exec babel-node --presets env app.js
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('./mongo/connect')
import Sms from './routes/sms.js'
import User from './routes/users'
const app = express()
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials","true");
    next()
  });
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/sms', Sms);
app.use('/api/user', User);
app.listen(4000, console.log("application is start at port 4000"))

