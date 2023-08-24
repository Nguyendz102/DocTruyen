const { Types } = require('mongoose');
var db = require('./db');

const BlChema = new db.mongoose.Schema({
    idtruyen: { type: String, require: true },
    iduser: { type: String, require: true },
    noidung: { type: String, require: true },
    date: {type:String,require:true},
    
}, {
    collection: 'binhluan'
});


let BlModel = db.mongoose.model('BlModel', BlChema);

module.exports = { BlModel };