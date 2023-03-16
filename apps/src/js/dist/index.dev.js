"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logOut = exports.roleList = exports.clearReactive = exports.getVFromLocalStorage = exports.routerBack = exports.phonNumberVerify = exports.routerPush = exports.formateCtime = exports.parseTimeStamp = void 0;

var parseTimeStamp = function parseTimeStamp(timeStamp) {
  var date = new Date(parseInt(timeStamp));
  return date.toLocaleString();
};

exports.parseTimeStamp = parseTimeStamp;

var formateCtime = function formateCtime(row) {
  var date = new Date(parseInt(row.ctime));
  return date.toLocaleString();
};

exports.formateCtime = formateCtime;

var routerPush = function routerPush($router, url) {
  $router.push(url);
};

exports.routerPush = routerPush;

var routerBack = function routerBack($router) {
  $router.go(-1);
};

exports.routerBack = routerBack;

var phonNumberVerify = function phonNumberVerify(phoneNumber) {
  return /^1[3,4,5,6,7,8,9][0-9]{9}$/.test(phoneNumber.toString());
};

exports.phonNumberVerify = phonNumberVerify;

var getVFromLocalStorage = function getVFromLocalStorage(item, subitem) {
  return JSON.parse(localStorage.getItem(item))[subitem];
};

exports.getVFromLocalStorage = getVFromLocalStorage;

var clearReactive = function clearReactive(obj) {
  Object.keys(obj).forEach(function (key) {
    obj[key] = '';
  });
};

exports.clearReactive = clearReactive;

var logOut = function logOut($router, path) {
  localStorage.clear();
  routerPush($router, path);
};

exports.logOut = logOut;
var roleList = [{
  roleName: "superAdmin",
  description: "超级管理员",
  roleCode: 1000
}, {
  roleName: "projectAdmin",
  description: "项目管理员",
  roleCode: 2000
}, {
  roleName: "websiteAdmin",
  description: "门户网站管理员",
  roleCode: 3000
}, {
  roleName: "instituteAdmin",
  description: "学院管理员",
  roleCode: 4000
}];
exports.roleList = roleList;