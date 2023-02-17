"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.projectModel = exports.userModel = exports.smsModel = void 0;

var _schema = require("./database/schema");

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var smsSchema = new _mongoose["default"].Schema(_schema.smsCode, {
  collection: 'sms'
});

var smsModel = _mongoose["default"].model('sms', smsSchema);

exports.smsModel = smsModel;
var userSchema = new _mongoose["default"].Schema(_schema.userStructure, {
  collection: 'user'
});

var userModel = _mongoose["default"].model('user', userSchema);

exports.userModel = userModel;
var projectSchema = new _mongoose["default"].Schema(_schema.project, {
  collection: 'project'
});

var projectModel = _mongoose["default"].model('project', projectSchema);

exports.projectModel = projectModel;