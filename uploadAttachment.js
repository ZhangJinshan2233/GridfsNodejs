const {
    createBucket
} = require('mongoose-gridfs');
const util = require('util');
const multer=require('multer')
module.exports= ()=>{
    let  photos = createBucket({
        bucketName: 'photos'
    });
    var uploadFile = multer({
        storage:photos
    }).any();
   
   return util.promisify(uploadFile);
}