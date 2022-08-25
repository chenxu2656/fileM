import sendSms from './sms/sendSms';
var express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/',sendSms)
// router.post('/verify',require('./sms/sendSms'))
export default router

