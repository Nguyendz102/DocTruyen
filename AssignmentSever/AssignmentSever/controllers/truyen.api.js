var md = require('../../assignmentsever/models/truyen.models');

var objReturn = {
    status: 1,
    msg: 'ok'
}


exports.list = async (req, res, next) => {

    let listTruyen = [];
    try {
        listTruyen = await md.TModel.find();
        if (listTruyen) {
            objReturn.data = listTruyen;
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

    const { tentruyen,mota,tentacgia,namxuatban,anhbia,noidung} = req.body;
    const newTruyen = new md.TModel({
        tentruyen: tentruyen,
        mota: mota,
        tentacgia: tentacgia,
        namxuatban:namxuatban,
        anhbia:anhbia,
        noidung:noidung 
    });
    newTruyen
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
      tentruyen: req.body.tentruyen,
      mota: req.body.mota,
      tentacgia: req.body.tentacgia,
      namxuatban: req.body.namxuatban,
      anhbia:req.body.anhbia,
      noidung:req.body.noidung
    };
    md.TModel.findByIdAndUpdate(id, updatData, { new: true })
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

    exports.delete = (req,res,next)=>{

        const idToDelete = req.params.id;
        // Tạo kết nối tới MongoDB
      md.TModel.findByIdAndRemove(idToDelete)
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
