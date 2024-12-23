USE quanlynhansu;
CREATE TABLE admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE, 
    password VARCHAR(255) NOT NULL,
    fullname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);

-- Insert the new data
INSERT INTO admins (username, password, fullname, email) VALUES
('huy.nguyenphandinh', '2211228', 'Nguyễn Phan Đình Huy', 'huy.nguyenphandinh@hcmut.edu.vn'),
('khang.nguyenan', '2211441', 'Nguyễn An Khang', 'khang.nguyenann@hcmut.edu.vn'),
('khoa.nguyenminh', '2211627', 'Nguyễn Minh Khoa', 'khoa.nguyenminh1511@hcmut.edu.vn'),
('long.tran2510', '2153538', 'Trần Thành Long', 'long.tran2510@hcmut.edu.vn'),
('nam.nguyenhoang', '2212142', 'Nguyễn Hoàng Nam', 'nam.nguyenhoang@hcmut.edu.vn');
