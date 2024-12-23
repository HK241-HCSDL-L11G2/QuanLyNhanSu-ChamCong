import express from 'express'
import { ReadFromProcedureQuery, ReadQuery, WriteQuery } from "./database.js";
import dotenv from 'dotenv'
import { getChiNhanh, getChiNhanh_Manager, getMaChiNhanh_TenChiNhanh, getMaNV_TenNhanVien, getNhanVien, getPhongBan, insertChiNhanh, insertNhanVien, deleteNhanVien, updateNhanVien, getDanhSachPhongBan, getNhanVienByMaNV, getMaPhongBan_TenPhongBan, getBangLuong, getPhongBanInfo, getPhongBanInfo_Manager, getPhongBanCoSoLuongNhanVienLonHon, getPhongBanCoSoLuongNhanVienCoMatNhieuNhat } from './api.js'
import bodyParser from 'body-parser'

dotenv.config()

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const PORT = process.env.BE_PORT || 3000

app.get('/', (req, res) => {
    res.send('Hello world')
})

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check user credentials in the database
        const sql = 'SELECT username, fullname, email FROM admins WHERE username = ?';
        const [user] = await ReadQuery(sql, [username]);

        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid username or password' });
        }

        // Send a success response with user details
        res.status(200).json({ success: true, message: 'Login successful', user });
    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

app.get('/api/admin-info', async (req, res) => {
    const { username } = req.query; // Extract the username from query parameters

    if (!username) {
        return res.status(400).json({ success: false, message: 'Username is required' });
    }

    try {
        const sql = 'SELECT fullname, email FROM admins WHERE username = ?'; // Filter by username
        const [result] = await ReadQuery(sql, [username]); // Pass username as a parameter

        if (!result) {
            return res.status(404).json({ success: false, message: 'Admin not found' });
        }

        const admin = [result[0], result[1]]; // Return fullname and email in an array
        // console.log('Admin data:', result); // Debugging
        res.status(200).json({ success: true, admin });
    } catch (error) {
        console.error('Error in /api/admin-info:', error.message);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

app.get('/api/nhanvien', async function (req, res) {
    const nhanvien = await getNhanVien();
    res.send({nhanvien})
})

app.get('/api/chinhanh', async function (req, res) {
    const chinhanh = await getChiNhanh();
    res.send({chinhanh})
})

app.get('/api/phongban', async function (req, res) {
    const phongbaninfo = await getPhongBanInfo_Manager();
    res.send({phongbaninfo})
})

app.get('/api/chinhanh-tenQuanLy', async function (req, res) {
    const chinhanh_tenQuanLy = await getChiNhanh_Manager();
    res.send({chinhanh_tenQuanLy})
})

app.get('/api/chinhanh-tenVanHanh', async function (req, res){
    const phongban_tenVanHanh = await getPhongBanInfo_Manager();
    res.send({phongban_tenVanHanh})
})

app.get('/api/phongban/:MaPB', async function (req, res) {
    const MaPB = req.params.MaPB
    const phongban = await getPhongBan(MaPB)
    res.send({phongban})
})

app.post('/api/chinhanh/insert', async function (req, res) {
    const {MaChiNhanh, TenChiNhanh, DiaChi, MSNV_QuanLy} = req.body;
    const [result, message] = await insertChiNhanh(MaChiNhanh, TenChiNhanh, DiaChi, MSNV_QuanLy)
    if (result === 400) 
        return res.status(400).json({
            success: false,
            message: message
        })
    
    return res.status(200).json({
        success: true,
        message: 'Thanh cong'
    })
    
})

app.get('/api/FullTime-MaNV-TenNhanVien', async function (req, res) {
    const MaNV_TenNhanVien = await getMaNV_TenNhanVien();
    res.send({MaNV_TenNhanVien})
})
app.post('/api/phongban/insert', async function (req, res) {
    const { MaPhongBan, TenPhongBan, MaChiNhanh, SoLuongNhanVien, MSNV_VanHanh } = req.body;
    const [result, message] = await insertPhongBan(MaPhongBan, TenPhongBan, MaChiNhanh, SoLuongNhanVien, MSNV_VanHanh);
    if (result === 400) {
        return res.status(400).json({
            success: false,
            message: message
        });
    }
    return res.status(200).json({
        success: true,
        message: 'Thêm phòng ban thành công'
    });
});

// Thêm nhân viên
app.post('/api/nhanvien/insert', async function (req, res) {
    const { MaNV, Ho, TenLot, Ten, GioiTinh, Email, LuongTheoGio, MaPhongBan } = req.body;
    const [result, message] = await insertNhanVien(MaNV, Ho, TenLot, Ten, GioiTinh, Email, LuongTheoGio, MaPhongBan);
    if (result === 400) {
        return res.status(400).json({
            success: false,
            message: message
        });
    }
    return res.status(200).json({
        success: true,
        message: 'Thêm nhân viên thành công'
    });
});

// Xóa nhân viên
app.delete('/api/nhanvien/delete/:MaNV', async function (req, res) {
    const { MaNV } = req.params;
    console.log(`Đang thực hiện yêu cầu xóa nhân viên với MãNV: ${MaNV}`);
    const [result, message] = await deleteNhanVien(MaNV);
    if (result === 400) {
        return res.status(400).json({
            success: false,
            message: message
        });
    }
    return res.status(200).json({
        success: true,
        message: 'Xóa nhân viên thành công'
    });
});

// Sửa thông tin nhân viên
app.put('/api/nhanvien/update/:MaNV', async (req, res) => {
    const { MaNV, Ho, TenLot, Ten, GioiTinh, Email, HeSoPhatDiTre, HeSoPhatVangKhongPhep, SoNgayNghi, LuongTheoGio, MaPhongBan } = req.body;
    console.log("Dữ liệu nhận được từ frontend:", req.body); // Kiểm tra dữ liệu từ frontend
    try {
      const [result, message] = await updateNhanVien(
        MaNV,
        Ho,
        TenLot,
        Ten,
        GioiTinh,
        Email,
        HeSoPhatDiTre,
        HeSoPhatVangKhongPhep,
        SoNgayNghi,
        LuongTheoGio,
        MaPhongBan
      );
      console.log("Kết quả cập nhật:", result); // Log kết quả từ database
      if (result === 400) {
        return res.status(400).json({ success: false, message });
      }
      res.status(200).json({ success: true, message: 'Cập nhật thành công' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Lỗi server' });
    }
});
  

app.get('/api/dsphongban', async function (req, res) {
    try {
        const phongbans = await getDanhSachPhongBan(); // Hàm gọi từ api.js
        res.json({ phongbans }); // Trả về JSON
    } catch (error) {
        console.error('Error in /api/dsphongban:', error); // Log lỗi chi tiết
        res.status(500).json({ error: 'Internal Server Error' }); // Trả về lỗi nếu có
    }
});

app.get('/api/nhanvien/:MaNV', async (req, res) => {
    const { MaNV } = req.params;
    try {
      const nhanvien = await getNhanVienByMaNV(MaNV); // Hàm này cần lấy từ database
      if (!nhanvien) {
        return res.status(404).json({ success: false, message: 'Nhân viên không tồn tại' });
      }
      res.status(200).json({ success: true, nhanvien });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Lỗi server' });
    }
});

app.get('/api/chinhanh-tenChiNhanh', async (req, res) => {
    try {
        const MaChiNhanh_TenChiNhanh = await getMaChiNhanh_TenChiNhanh();
        res.status(200).json({
            success: true,
            MaChiNhanh_TenChiNhanh
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Lỗi server' });
    }
})

app.get('/api/phongBan-TenPhongBan/:MaChiNhanh', async (req, res) => {
    // console.log(req.params.body);
    let {MaChiNhanh} = req.params;
    if (MaChiNhanh === 'all') MaChiNhanh = '';
    // console.log(MaChiNhanh);
    try {
        const MaPhongBan_TenPhongBan = await getMaPhongBan_TenPhongBan(MaChiNhanh);
        res.status(200).json({
            success: true,
            MaPhongBan_TenPhongBan
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Lỗi server' });
    }
})

app.get('/api/bang-luong', async (req, res) => {
    let {MaPhongBan, EmpType, BeginDate, EndDate} = req.query;
    if (!MaPhongBan) MaPhongBan = "all";
    // console.log(MaPhongBan, EmpType, BeginDate, EndDate);
    try {
        const BangLuong = await getBangLuong(MaPhongBan, EmpType, BeginDate, EndDate);
        // console.log(BangLuong)
        res.status(200).json({
            success: true,
            BangLuong
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Lỗi server' });
    }
})

app.get('/api/phongban-co-nhanvien-lon-hon', async (req, res) => {
    const { min } = req.query; // Lấy tham số "min" từ query string
    if (!min) {
        return res.status(400).json({
            success: false,
            message: 'Vui lòng cung cấp tham số "min"',
        });
    }

    try {
        const filteredPhongBan = await getPhongBanCoSoLuongNhanVienLonHon(min);
        res.status(200).json({
            success: true,
            filteredPhongBan,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Lỗi server',
        });
    }
});

app.get('/api/phongban-nhanvien-comatnhieunhat', async (req, res) => {
    try {
        const maxPresencePhongBan = await getPhongBanCoSoLuongNhanVienCoMatNhieuNhat();  // Hàm này sẽ gọi thủ tục bạn đã tạo
        res.status(200).json({
            success: true,
            maxPresencePhongBan,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false, 
            message: 'Lỗi khi lấy dữ liệu phòng ban' 
        });
    }
});

app.listen(PORT, (req, res) => {
    console.log(`Server start at http://localhost:${PORT}`);
}) 
