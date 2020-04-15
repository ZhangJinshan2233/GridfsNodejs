const {
  createModel
} = require('mongoose-gridfs');
module.exports= ()=>{
  let  photos = createModel({
      modelName: 'photos'
  });
  return photos
}