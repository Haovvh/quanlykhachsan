drop database QLKhachSan;
create database QLKhachSan;

CREATE TABLE QLKhachSan.Roles (
        id			            BIGINT PRIMARY KEY AUTO_INCREMENT
        ,rolename                   VARCHAR(50) NOT NULL
        ,isDelete				BOOL DEFAULT FALSE
        ,UNIQUE(rolename)
        );

CREATE TABLE QLKhachSan.Users (
		id			            BIGINT PRIMARY KEY AUTO_INCREMENT
		,email					VARCHAR(128)
		,phone					VARCHAR(11) NOT NULL
		,password				VARCHAR(100) NOT NULL
		,fullname				VARCHAR(128) NOT NULL
		,dateofbirth			VARCHAR(10) NOT NULL
		,gender					BIGINT DEFAULT 1
		,roletype				BIGINT 
        ,status                 BIGINT 
        ,isDelete				BOOL DEFAULT FALSE
		,UNIQUE (phone)
        ,UNIQUE (email) 
        );	
        CREATE TABLE QLKhachSan.Customers (
		id			            BIGINT PRIMARY KEY AUTO_INCREMENT
		,phone					VARCHAR(11) NOT NULL
        ,citizenIdentityCard	VARCHAR(12) NOT NULL
        ,address 				VARCHAR(200) NOT NULL
		,fullname				VARCHAR(128) NOT NULL
		,dateofbirth			VARCHAR(10) NOT NULL
        ,customertype			BIGINT 
		,gender					BIGINT 
        ,status                 BIGINT 
        ,createat               DATETIME NOT NULL DEFAULT NOW()
        ,isDelete				BOOL DEFAULT FALSE        
		,UNIQUE (phone)
        ,UNIQUE (citizenIdentityCard)
        );	
        
        CREATE TABLE QLKhachSan.Rooms (
		id			            BIGINT PRIMARY KEY AUTO_INCREMENT
		,roomname					VARCHAR(11) NOT NULL
        ,roomtype				BIGINT NOT NULL
        ,description 			VARCHAR(200)
        ,status                 VARCHAR(20) 	DEFAULT 'SANSANG'
        ,isDelete				BOOL DEFAULT FALSE
        ,UNIQUE(roomname)
        );
        
        CREATE TABLE QLKhachSan.Roomtypes (
		id			            BIGINT PRIMARY KEY AUTO_INCREMENT
		,roomtypename					VARCHAR(50) NOT NULL
        ,price 					DECIMAL DEFAULT 0
        ,maxcustomer            BIGINT DEFAULT 1
        ,isDelete				BOOL DEFAULT FALSE
        ,UNIQUE(roomtypename)
        );
        
        CREATE TABLE QLKhachSan.Roomservices (
		id			            BIGINT PRIMARY KEY AUTO_INCREMENT
		,roomservicename		VARCHAR(50) NOT NULL
        ,price					DECIMAL DEFAULT 0
        ,isDelete				BOOL DEFAULT FALSE
        ,UNIQUE(roomservicename)
        );
        
        CREATE TABLE QLKhachSan.Books (
		id			            BIGINT PRIMARY KEY AUTO_INCREMENT
        ,roomid				    BIGINT 
        ,userid				    BIGINT 
        ,paymentid			    BIGINT 
        ,bookdate		    	DATETIME DEFAULT CURRENT_TIMESTAMP
        ,checkindate		    DATETIME DEFAULT NOW()
        ,checkoutdate		    DATETIME
        ,totalmoney             BIGINT DEFAULT 0
        ,statusBook             VARCHAR(20) DEFAULT 'CHUATHANHTOAN'
        ,isDelete				BOOL DEFAULT FALSE
        ,isSave                 BOOL DEFAULT FALSE
        );
        
        CREATE TABLE QLKhachSan.Bookdetails (
		id			            BIGINT  
        ,bookid				    BIGINT 
        ,customerid				BIGINT 
        ,status                 BIGINT 
        ,isDelete				BOOL DEFAULT FALSE
        ,PRIMARY KEY (id, bookid, customerid)
        );
        CREATE TABLE QLKhachSan.Roomservicedetails (
		id			            BIGINT 
        ,bookid				    BIGINT 
        ,roomserviceid			BIGINT 
        ,quantity		        BIGINT DEFAULT 0
        ,status                 BIGINT 
        ,isDelete				BOOL DEFAULT FALSE
        ,PRIMARY KEY(id, bookid, roomserviceid)
        );
        CREATE TABLE QLKhachSan.Statuss (
		id			            BIGINT PRIMARY KEY 
        ,statusname             VARCHAR(50) NOT NULL
        ,isDelete				BOOL DEFAULT FALSE
        ,UNIQUE(statusname)
        );
        CREATE TABLE QLKhachSan.Genders (
		id			            BIGINT PRIMARY KEY AUTO_INCREMENT
        ,gendername                   VARCHAR(50) NOT NULL
        ,isDelete				BOOL DEFAULT FALSE
        ,UNIQUE(gendername)
        );
        CREATE TABLE QLKhachSan.CustomerTypes (
		id			            BIGINT PRIMARY KEY AUTO_INCREMENT
        ,customertypename                   VARCHAR(50) NOT NULL
        ,isDelete				BOOL DEFAULT FALSE
        ,UNIQUE(customertypename)
        );
        CREATE TABLE QLKhachSan.Payments (
		id			            BIGINT PRIMARY KEY AUTO_INCREMENT
        ,paymentname                   VARCHAR(50) NOT NULL
        ,isDelete				BOOL DEFAULT FALSE
        ,UNIQUE(paymentname)
        );

        INSERT INTO qlkhachsan.Statuss(id, statusname)
        VALUES (1, 'Đã sẵn sàng'), (2,'Đang cho thuê'),(3,'Đang vệ sinh'),
        (4,'Đang bảo trì'), (10,'Chưa Thanh Toán'), (11,'Đã thanh toán');

        INSERT INTO qlkhachsan.CustomerTypes(customertypename)
        VALUES ('Trong nước'), ('Quốc tế'),('Khác');

        INSERT INTO qlkhachsan.Customers(phone, citizenIdentityCard, address, fullname, dateofbirth, customertype, gender)
        VALUES ('0905666789','23331936746','66 Nguyễn Ngọc Phương','Nguyễn Kiều Trinh','1981-05-04','1','1'),
        ('0903363399','233308198946','1 Phạm Văn Bạch','Trần Bá Đạo','1981-05-04','1','1'),
        ('0905666699','194946194946','180 Trần Bình Trọng','Trần Thiên Ân Thư','1981-05-04','1','2'),
        ('0905667899','223330819246','Nơ Trang Long','Võ Công Danh','1981-05-04','1','1'),
        ('0905663349','219494633308','20 Nguyễn Huệ','Bill Jack','1981-06-07','2','1'),
        ('0905663509','224585585746','40 Mạc Đĩnh Chi','Smith','1971-05-01','2','2'),
        ('0905628399','333081946946','25 Phạm Văn Chiêu','Nguyễn Anh Chiến','1991-05-04','1','1'),
        ('0905123399','221333081912','66 Quang Trung','Trần Thị Kim Cương','1995-03-09','1','2'),
        ('0905453399','221301574946','25 Phạm Ngũ Lão','Lê Quang Bảo','2001-05-01','1','1');

        INSERT INTO qlkhachsan.Genders(gendername)
        VALUES ('Nam'), ('Nữ'),('Khác');

        INSERT INTO qlkhachsan.Roomservices(roomservicename, price)
        VALUES ('Bún Bò', 35000), ('Hủ tiếu', 40000),('Mì Quảng', 45000),
        ('Nước suối', 5000), ('Nước ngọt', 15000),('Bia', 15000),
        ('Giặt đồ (1kg)', 50000), ('Xà phòng', 20000);

        INSERT INTO qlkhachsan.Roomtypes(roomtypename, price)
        VALUES ('Phòng Thường', 250000), ('Phòng Thường 2 Giường', 350000),('Phòng VIP', 450000),
        ('Phòng VIP 2 Giường', 650000), ('Phòng SUPERVIP', 800000),('Phòng Vua', 1200000);
        INSERT INTO qlkhachsan.Payments(paymentname)
        VALUES ('Tiền mặt'), ('Chuyển Khoản'),('VISA'), ('Khác');
        INSERT INTO qlkhachsan.Rooms(roomname, roomtype, description)
        VALUES ('P101', 1, 'Tầng 1 Phòng 1'), ('P102', 1, 'Tầng 1 Phòng 2'),('P103', 1, 'Tầng 1 Phòng 3'),
        ('P201', 2, 'Tầng 2 Phòng 1'),('P202', 2, 'Tầng 2 Phòng 2'),('P203', 2, 'Tầng 2 Phòng 3'),
        ('VIP1', 3, 'Tầng 3 Phòng 1'),('VIP2', 3, 'Tầng 3 Phòng 2'),('VIP3', 3, 'Tầng 3 Phòng 3'),
        ('SUPERVIP1', 4, 'Tầng 4 Phòng 1'),('SUPERVIP2', 4, 'Tầng 4 Phòng 2'),('SUPERVIP3', 4, 'Tầng 4 Phòng 3'),
       ('KING1', 5, 'Tầng 5 Phòng 1'),('KING2', 5, 'Tầng 5 Phòng 2'),('KING3', 5, 'Tầng 5 Phòng 3');
