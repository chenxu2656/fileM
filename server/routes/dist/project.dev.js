"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// 创建项目 
var createProject = {};

var express = require('express');

var router = express.Router();
router.post('/', createProject);
var _default = router;
exports["default"] = _default;