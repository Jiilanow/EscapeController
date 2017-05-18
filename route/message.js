const express = require('express')
const messageService = require('../service/message')
let router  = express.Router()
router.route('/')
    .get((req, res) => {
        res.json(messageService.getMessages())
    })


router.route('/add')
    .post((req, res) => {
        messageService.addMessage(req.body.message)
        res.json({success: true})

    })

router.route('/reset')
    .get((req, res) => {
        messageService.resetMessage()
        res.json({success: true})
    })

module.exports = router