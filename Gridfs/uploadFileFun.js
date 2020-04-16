const {
    createBucket
} = require('mongoose-gridfs');
const util = require('util');
const multer=require('multer')
module.exports= ()=>{
    let  photos = createBucket({
        bucketName: 'photos',
        chunkSizeBytes: 1024*1024
    });
    var uploadFile = multer({
        storage:photos
    }).any();
   uploadFile['util.promisify.coutom']=()=>{
       return Promise.reject('can not upload photo')
   }
   return util.promisify(uploadFile);
}