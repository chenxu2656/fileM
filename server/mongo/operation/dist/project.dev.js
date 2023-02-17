"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCrddential = exports.createUser = void 0;

var _ = require("..");

var _errorCode = _interopRequireDefault(require("../../errorhandle/errorCode"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var createUser = function createUser(userInfo) {
  var saltRounds, salt, pwBcrypt, user, successInfo;
  return regeneratorRuntime.async(function createUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          saltRounds = 10;
          _context.next = 3;
          return regeneratorRuntime.awrap(_bcrypt["default"].genSalt(saltRounds));

        case 3:
          salt = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(_bcrypt["default"].hash(userInfo.password, salt));

        case 6:
          pwBcrypt = _context.sent;
          _context.prev = 7;
          _context.next = 10;
          return regeneratorRuntime.awrap(userModel.create({
            name: userInfo.name,
            phoneNumber: userInfo.phoneNumber,
            password: pwBcrypt,
            studentId: userInfo.studentId,
            role: userInfo.role,
            grade: userInfo.grade
          }));

        case 10:
          user = _context.sent;
          successInfo = _errorCode["default"].Success;
          successInfo.msg = user;
          return _context.abrupt("return", successInfo);

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](7);

          if (!(_context.t0.code == 11000)) {
            _context.next = 22;
            break;
          }

          return _context.abrupt("return", _errorCode["default"].SignInfoRepeat);

        case 22:
          return _context.abrupt("return", _errorCode["default"].SignInfoFail);

        case 23:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[7, 16]]);
};

exports.createUser = createUser;

var pwVerify = function pwVerify(loginInfo) {
  var phoneNumber, pw, userExist, pwCorrect;
  return regeneratorRuntime.async(function pwVerify$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          phoneNumber = loginInfo.phoneNumber, pw = loginInfo.pw;
          _context2.next = 3;
          return regeneratorRuntime.awrap(userModel.findOne({
            phoneNumber: phoneNumber
          }));

        case 3:
          userExist = _context2.sent;

          if (userExist) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt("return", _errorCode["default"].userNotExist);

        case 6:
          pwCorrect = _bcrypt["default"].compare(pw, userExist.password);

          if (pwCorrect) {
            _context2.next = 9;
            break;
          }

          return _context2.abrupt("return", _errorCode["default"].pwIncorrect);

        case 9:
          return _context2.abrupt("return", _errorCode["default"].Success);

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var storeJwt = function storeJwt(loginInfo) {
  var secretKey, phoneNumber, token;
  return regeneratorRuntime.async(function storeJwt$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          secretKey = 'user_sys';
          phoneNumber = loginInfo.phoneNumber;
          token = _jsonwebtoken["default"].sign({
            phoneNumber: phoneNumber
          }, secretKey, {
            expiresIn: "7 days"
          });
          return _context3.abrupt("return", {
            status: 200,
            msg: token
          });

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
};

var createCrddential = function createCrddential(loginInfo) {
  var pw, token;
  return regeneratorRuntime.async(function createCrddential$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(pwVerify(loginInfo));

        case 2:
          pw = _context4.sent;

          if (!(pw.status != 200)) {
            _context4.next = 6;
            break;
          }

          console.log(pw);
          return _context4.abrupt("return", pw);

        case 6:
          token = storeJwt(loginInfo);
          return _context4.abrupt("return", token);

        case 8:
        case "end":
          return _context4.stop();
      }
    }
  });
};

exports.createCrddential = createCrddential;