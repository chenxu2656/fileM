import sendSms from './sms/sendSms';
import smsVerify from './sms/verify'
var express = require('express');
const router = express.Router();
router.post('/',sendSms)
router.post('/verify',smsVerify)
export default router

