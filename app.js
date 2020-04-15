'use strict'
const express = require('express');
//use async/await syntax
require('express-async-errors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors')
const app = express();
require('./db')
const {

    uploadFileFun
} = require('./Gridfs')
const createFileModel = require('./Gridfs/createFileModel')
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
    let uploadFilePromise = uploadFileFun()
    try {
        await uploadFilePromise(req, res)
        res.status(200).json({
            message: "upload successfully"
        })
    } catch (err) {
        throw err
    }

})
app.get('/api/upload', async (req, res) => {
    let {
        filename
    } = req.query
    let FileModel = createFileModel();
    let file = await FileModel.findOne({
        filename
    })
    if (file) {
        let readstream = file.read({
            filename: file.filename,
        });
        res.set('Content-Type', file.contentType)
        readstream.pipe(res);
    } else {
        res.status(200).json({
            file: null
        })
    }

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