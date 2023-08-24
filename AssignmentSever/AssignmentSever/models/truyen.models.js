const { Types } = require('mongoose');
var db = require('./db');

const TChema = new db.mongoose.Schema({
    tentruyen: { type: String, require: true },
    mota: { type: String, require: true },
    tentacgia: { type: String, require: true },
    namxuatban: {type:String,require:true},
    anhbia:{type:String},
    noidung:{type:Array}
}, {
    collection: 'truyen'
});


let TModel = db.mongoose.model('TModel', TChema);

module.exports = { TModel };