var md = require('../../assignmentsever/models/binhluan.models');

var objReturn = {
    status: 1,
    msg: 'ok'
}


exports.list = async (req, res, next) => {

    let listBl = [];
    try {
        listBl = await md.BlModel.find();
        if (listBl) {
            objReturn.data = listBl;
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

    const { iduser, idtruyen, date, noidung} = req.body;

    // console.log(
    //     `
    //     \n>>>>>> Check:
    //     ID user: ${idUser}
    //     ID Truyen: ${idTruyen}
    //     Name truyen: ${nameTruyen}
    //     Date: ${date}
    //     Noi dung: ${noidung}\n
    //     `
    // )

    const newBinhLuan = new md.BlModel({
        iduser: iduser,
        idtruyen: idtruyen,
        date: date,
        noidung: noidung
    });
    newBinhLuan
        .save()
        .then(() =>{
            res.status(201).json({ message: 'Đã lưu đối tượng vào MongoDB'});
        })
        .catch((error) => {
            console.error("Lỗi lưu đối tượng vào MongoDB: ",error);
            res.status(500).json({ error: "Đã xảy ra lỗi server"});
        });
}


exports.update = (req, res, next) => {

    const id = req.params.id;
  const updatData = {
    iduser: req.body.iduser,
    idtruyen: req.body.idtruyen,
    date: req.body.date,
    noidung: req.body.noidung,
  };
  md.BlModel.findByIdAndUpdate(id, updatData, { new: true })
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
exports.delete = (req,res,next) =>{
    const idToDelete = req.params.id;
    // Tạo kết nối tới MongoDB
    md.BlModel.findByIdAndRemove(idToDelete)
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
