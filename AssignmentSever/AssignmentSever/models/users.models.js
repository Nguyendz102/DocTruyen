const { Types } = require('mongoose');
var db = require('./db');

const UChema = new db.mongoose.Schema({
    username: { type: String, require: true },
    passwd: { type: String, require: true },
    email: { type: String, require: true },
    fullname: {type:String,require:true}
}, {
    collection: 'users'
});


let uModel = db.mongoose.model('uModel', UChema);

module.exports = { uModel };