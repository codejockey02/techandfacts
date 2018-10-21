const mongoose = require('mongoose');

mongoose.connect('mongodb://techandfacts007:alpha123@ds131963.mlab.com:31963/techandfacts')
    .then(()=> console.log("Connected to MongoDB..."))
    .catch(err => console.error("Could Not Connect...",err));

const image = mongoose.Schema({
    url: String,
    text: String
});

mongoose.Promise = global.Promise;
module.exports = mongoose.model('bollywood',image);