const express = require('express')
const time = require('../service/time')
let router  = express.Router()

router.route('/')
    .get((req, res) => {
        res.json(time.GetTime())
    })
    .post((req,res) => {
        time.SetTime(req.body.time)
        res.json({success:true,time: req.body.time});
    });

module.exports = router