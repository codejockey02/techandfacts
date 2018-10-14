var cloudinary = require('cloudinary');
var upload = require('./imageSchema');         
cloudinary.config({ 
    cloud_name: 'techandfacts', 
    api_key: '269358493623384', 
    api_secret: 'vW4sSCWdiM36WaFOeqB16stEhqU' 
});
exports.imageUpload = (tmp_path, file_name)=>
    cloudinary.uploader.upload( tmp_path, function(result) { 
            console.log(result);
            var data = result["url"];
            const newImage = new upload({
                url: data
            });
            newImage.save()
            .then(result=>{
            console.log(result.message);
            })
            .catch(err=>{
            console.log(err);
            });
            }, { public_id: file_name })
            .then(()=> resolve({status: 201, message: 'Image Uploaded'}))       
            .catch(err => {
                reject({status: 500, message: 'Internal Server Error !'});
});
          

             