"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _project = require("../mongo/operation/project");

// 创建项目 
var createP = function createP(req, res) {
  var reqBody, resp;
  return regeneratorRuntime.async(function createP$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          reqBody = req.body;
          _context.next = 3;
          return regeneratorRuntime.awrap((0, _project.createProject)(reqBody));

        case 3:
          resp = _context.sent;
          res.status(resp.status).json(resp);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
};

var getProject = function getProject(req, res) {
  var queryList, resp;
  return regeneratorRuntime.async(function getProject$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          queryList = req.query;
          _context2.next = 3;
          return regeneratorRuntime.awrap((0, _project.getProjectList)(queryList));

        case 3:
          resp = _context2.sent;
          res.status(resp.status).json(resp);

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var express = require('express');

var router = express.Router();
router.post('/create', createP);
router.get('/list', getProject);
var _default = router;
exports["default"] = _default;