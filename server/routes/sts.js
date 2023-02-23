var express = require('express');
const router = express.Router();
const getCredential = (req,res)=>{
    res.status(200).json({
        "msg": "1112"
    })
}
router.get('/',getCredential)
export default router

