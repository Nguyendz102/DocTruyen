const mongoose = require('mongoose');
mongoose.connect ('mongodb://127.0.0.1:27017/AssignmentSever')
.catch((err)=>{
    console.log("Lỗi kết nối");
    console.log(err);
})

module.exports={mongoose}