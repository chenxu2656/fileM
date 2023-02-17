"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _createUser = _interopRequireDefault(require("./user/createUser"));

var _login = _interopRequireDefault(require("./user/login"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var express = require('express');

var router = express.Router();
router.post('/register', _createUser["default"]);
router.post('/login', _login["default"]);
var _default = router;
exports["default"] = _default;