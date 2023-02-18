"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getProjectList = exports.createProject = void 0;

var _ = require("..");

var _errorCode = _interopRequireDefault(require("../../errorhandle/errorCode"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var createProject = function createProject(projectInfo) {
  var createP, resp, _resp;

  return regeneratorRuntime.async(function createProject$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_.projectModel.create({
            projectName: projectInfo.projectName,
            sTime: projectInfo.sTime,
            eTime: projectInfo.eTime,
            contact: projectInfo.contact,
            contactInfo: projectInfo.contactInfo,
            relatedNewsId: projectInfo.relatedNewsId,
            createId: projectInfo.createId
          }));

        case 3:
          createP = _context.sent;
          resp = _errorCode["default"].Success;
          resp.msg = createP;
          return _context.abrupt("return", resp);

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          _resp = _errorCode["default"].errNodefine;
          _resp.msg = _context.t0;
          return _context.abrupt("return", _resp);

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

exports.createProject = createProject;

var getProjectList = function getProjectList(reqInfo) {
  var responseInfo, resp, _resp2;

  return regeneratorRuntime.async(function getProjectList$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          responseInfo = [];

          if (!(JSON.stringify(reqInfo) === '{}')) {
            _context2.next = 6;
            break;
          }

          _context2.next = 5;
          return regeneratorRuntime.awrap(_.projectModel.find());

        case 5:
          responseInfo = _context2.sent;

        case 6:
          console.log(responseInfo);
          resp = _errorCode["default"].Success;
          resp.msg = responseInfo;
          return _context2.abrupt("return", resp);

        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](0);
          _resp2 = _errorCode["default"].errNodefine;
          _resp2.msg = _context2.t0;
          return _context2.abrupt("return", _resp2);

        case 17:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 12]]);
};

exports.getProjectList = getProjectList;