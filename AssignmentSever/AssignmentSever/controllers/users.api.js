var md = require('../../assignmentsever/models/users.models');

var objReturn = {
    status: 1,
    msg: 'ok'
}


exports.list = async (req, res, next) => {

    let listUser = [];
    try {
        listUser = await md.uModel.find();
        if (listUser) {
            objReturn.data = listUser;
            objReturn.status = 1;
            objReturn.msg = "Lay danh sach thanh cong"
        } else {
            objReturn.status = 0;
            objReturn.msg = "Khong co du lieu"
        }
    } catch (error) {
        objReturn = 0;
        objReturn.msg = error.msg;
    }

    res.json(objReturn);
}
exports.add = async (req, res, next) => {

    if (req.method == "POST") {
        var objU = new md.uModel();
        objU.username = req.body.username;
        objU.email = req.body.email;
        objU.passwd = req.body.passwd;
        objU.fullname = req.body.fullname;
        try {
            await objU.save();
            objReturn.status = 1;
            objReturn.msg = "Da them thanh cong";
        } catch (err) {
            objReturn.status = 0;
            objReturn.msg = err.msg;
        }
    }
    res.json(objReturn);
}


exports.update = async (req, res, next) => {
    let id = req.params.id;
    let objU =  md.uModel().findById(id);

    if (req.method == 'POST') {
        //Kiem tra hop le du lieu

        //Tao doi tuong model de gan du lieu
      //  let objBl = new md.BlModel();
        objU.username = req.body.username;
        objU.email = req.body.email;
        objU.passwd = req.body.passwd;
        objU.fullname = req.body.fullname;
       
       // them id the loai

      //  objSP._id = id;
        //Ghi CSDL

        try {
            // let new_sp = await objSP.save();
            // console.log(new_sp);
            // msg = "Da them thanh cong"
           await objU.findByIdAndUpdate(id);
            objReturn.status = 1;
            objReturn.msg = "Da sua thanh cong";
            
        } catch (err) {
            objReturn.status = 0;
            objReturn.msg = err.msg;
            // msg = 'Loi ' + error.message();
            // console.log(error);
        }
    }

    res.json(objReturn);
}
exports.delete  = async (req,res,next) =>{
    let id= req.params.id;
    try {
        await md.uModel().findByIdAndDelete({_id:id});
        objReturn.status = 1;
        objReturn.msg = "Da xoa thanh cong";
    } catch (err) {
    console.log(err);    
    objReturn.status = 0;
    objReturn.msg = err.msg;
    }
   res.json(objReturn);
}
