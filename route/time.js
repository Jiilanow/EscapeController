const express = require('express')
const time = require('../service/time')
let router  = express.Router()

router.route('/')
    .get((req, res) => {
        res.json(time.GetTime())
    });

module.exports = router