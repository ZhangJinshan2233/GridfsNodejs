const {
  createModel
} = require('mongoose-gridfs');
module.exports= ()=>{
  let  photos = createModel({
      modelName: 'photos',
      chunkSizeBytes: 1024*1024
  });
  return photos
}