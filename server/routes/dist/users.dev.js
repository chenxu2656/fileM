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

var getUerInfo = function getUerInfo(req, res) {};

var updateInfo = function updateInfo(req, res) {};

router.post('/register', _createUser["default"]);
router.post('/login', _login["default"]);
router.get('/:id', getUerInfo);
router.put('/:id', updateInfo);
var _default = router;
exports["default"] = _default;