
require('dotenv').config();
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

aws.config.update({
    secretAccessKey: process.env.AWS_SECRET,
    accessKeyId: process.env.AWS_KEY,
    region: process.env.REGION
}); 
  
const s3 = new aws.S3();
const BUCKET = process.env.BUCKET;
  
const uploadImage = multer({
    storage: multerS3({
        bucket: BUCKET,
        s3: s3,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: (req, file, cb) => {
        cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
            console.log(file.originalname);
            cb(null, file.originalname);
        }
    })
});

module.exports = {
    uploadImage
}