const mongoose = require('mongoose')
const {
    createBucket
} = require('mongoose-gridfs');
const util = require('util');
const {
    dbUrl
} = require('./config');
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.set("useUnifiedTopology", true);
Promise = global.Promise
mongoose.connect(dbUrl, {
    socketTimeoutMS: 3000000,
    keepAlive: 3000000,
    useNewUrlParser: true
})
mongoose.connection.once('open', (err, result) => {
    console.log('database connected')
})
