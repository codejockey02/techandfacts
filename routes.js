const express    = require('express');        
const app        = express();                
const bodyParser = require('body-parser');
const logger 	 = require('morgan');
const router     = express.Router();
const port 	     = process.env.PORT || 8080;
const cloudinary = require('cloudinary');
const multer = require('multer');
const fs = require('fs');
const mongoose = require('mongoose');
app.use(bodyParser.json({limit:'500mb'}));
bodyParser.urlencoded({extended: true, limit: '500mb'})
app.use(logger('dev'));
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
      }
});
const upload = multer({ storage: storage });

const image = require('./image');
const schema = require('./imageSchema');

app.get('/images',(req,res) => {
    async function getReq(){      
        const allReq = await schema.find()
        .sort({number: -1})
        .select({url:1, _id:0, number:1, text:1});
        console.log(allReq);

        res.send(allReq); 
    }
    getReq();
});

app.post('/imageupload', upload.single('avatar'),(req,res) => {
    var tmp_path = req.file.path;
    var file_name = req.file.originalname;
    var target_path = 'uploads/' + req.file.originalname;
    var src = fs.createReadStream(tmp_path);
    var dest = fs.createWriteStream(target_path);
    src.pipe(dest);
    src.on('end', function() { res.json({"message": "Image Uploaded Successfully."}); });
    src.on('error', function(err) { res.send({error: "upload failed"}); });
    image.imageUpload(tmp_path, file_name); 
});



app.listen(port);

console.log(`App Runs on ${port}`);