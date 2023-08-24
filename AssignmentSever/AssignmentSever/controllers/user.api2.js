var md = require('../../assignmentsever/models/users.models');
var objReturn = {
    status: 1,
    msg: 'ok'
}
exports.list = async(req,res,next) =>{

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
    const { username,passwd,email,fullname} = req.body;
    const newUser = new md.uModel({
        username: username,
        passwd: passwd,
        email: email,
        fullname: fullname
    });
    newUser
        .save()
        .then(() =>{
            res.status(201).json({ message: 'Đã lưu đối tượng vào MongoDB'});
        })
        .catch((error) => {
            console.error("Lỗi lưu đối tượng vào MongoDB: ",error);
            res.status(500).json({ error: "Đã xảy ra lỗi server"});
        });
}
exports.delete = (req,res,next)=>{

    const idToDelete = req.params.id;
    // Tạo kết nối tới MongoDB
  md.uModel.findByIdAndRemove(idToDelete)
      .then((data) => {
        if (data) {
          res
            .status(200)
            .json({ message: "Dữ liệu đã được xóa thành công", data: data });
        } else {
          res.status(404).json({ error: "Không tìm thấy dữ liệu" });
        }
      })
      .catch((error) => {
        res.status(500).json({ error: "Đã xảy ra lỗi khi xóa dữ liệu" });
      });
}
exports.edit =  async (req,res,next)=>{
    const id = req.params.id;
  const updatData = {
    username: req.body.username,
    email: req.body.email,
    passwd: req.body.passwd,
    fullname: req.body.fullname
  };
  md.uModel.findByIdAndUpdate(id, updatData, { new: true })
    .then((data) => {
      if (data) {
        res.status(200).json({
          message: "Dữ liệu đã được cập nhật thành công",
          data: data,
        });
      } else {
        res.status(404).json({ error: "Không tìm thấy dữ liệu" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Đã xảy ra lỗi khi cập nhật dữ liệu" });
    });

}