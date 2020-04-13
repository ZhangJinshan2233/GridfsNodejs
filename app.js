'use strict'
const express = require('express');
//use async/await syntax
require('express-async-errors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors')
const app = express();
require('./db')
const upload = require('./uploadAttachment')
const fileModel = require('./downloadAttachment')
app.use(cors());
app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 100000
}));
app.use(morgan('dev'));
// refer to routes

app.post('/api/upload', async function (req, res) {
    let uploadPromise = upload()
    try {
        await uploadPromise(req, res)
        res.status(200).json({
            message: "upload successfully"
        })
    } catch (err){
        throw err
    }

})
app.get('/api/upload/:filename', function (req, res) {
    let Attachment = fileModel()
    console.log(req.params.filename)
    Attachment.findOne({
        filename: req.params.filename
    }, (error, attachment) => {
        let readstream = attachment.read({
            filename: attachment.filename,
        });
        res.set('Content-Type', attachment.contentType)
        readstream.pipe(res);
    });
})
// error handler for not existed api
app.use(function (req, res, next) {
    const err = new Error('No found api');
    err.status = 400;
    next(err);
})

//error handler for all kinds of error
app.use(function (err, req, res, next) {
    if (err.name === 'UserFacingError') {
        res.status(404)
            .json({
                message: err.message
            })
    } else if (res.status === 401) {
        res.status(401)
            .json({
                message: "Unauthorized"
            })

    } else {
        console.log(err)
        res.status(500)
            .json({
                message: "internal server error"
            })
    }
})

module.exports = app