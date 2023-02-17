"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routerBack = exports.phonNumberVerify = exports.routerPush = exports.formateCtime = exports.parseTimeStamp = void 0;

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