drop database QLKhachSan;
create database QLKhachSan;

CREATE TABLE QLKhachSan.Roles (
        id			            BIGINT PRIMARY KEY AUTO_INCREMENT
        ,name                   VARCHAR(50) NOT NULL
        ,isDelete				BOOL DEFAULT FALSE
        ,UNIQUE(name)
        );

CREATE TABLE QLKhachSan.Users (
		id			            BIGINT PRIMARY KEY AUTO_INCREMENT
		,email					VARCHAR(128)
		,phone					VARCHAR(11) NOT NULL
		,password				VARCHAR(100) NOT NULL
		,fullname				VARCHAR(128) NOT NULL
		,dateofbirth			VARCHAR(10) NOT NULL
		,gender					BIGINT 
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
        ,isDelete				BOOL DEFAULT FALSE        
		,UNIQUE (phone)
        ,UNIQUE (citizenIdentityCard)
        );	
        
        CREATE TABLE QLKhachSan.Rooms (
		id			            BIGINT PRIMARY KEY AUTO_INCREMENT
		,name					VARCHAR(11) NOT NULL
        ,roomtype				BIGINT NOT NULL
        ,description 			VARCHAR(200)
        ,status                 BIGINT 	
        ,isDelete				BOOL DEFAULT FALSE
        ,UNIQUE(name)
        );
        
        CREATE TABLE QLKhachSan.Roomtype (
		id			            BIGINT PRIMARY KEY AUTO_INCREMENT
		,name					VARCHAR(50) NOT NULL
        ,price 					DECIMAL DEFAULT 0
        ,isDelete				BOOL DEFAULT FALSE
        ,UNIQUE(name)
        );
        
        CREATE TABLE QLKhachSan.Roomservice (
		id			            BIGINT PRIMARY KEY AUTO_INCREMENT
		,name					VARCHAR(50) NOT NULL
        ,price					DECIMAL DEFAULT 0
        ,isDelete				BOOL DEFAULT FALSE
        ,UNIQUE(name)
        );
        
        CREATE TABLE QLKhachSan.Books (
		id			            BIGINT PRIMARY KEY AUTO_INCREMENT
        ,roomid				    BIGINT NOT NULL
        ,userid				    BIGINT NOT NULL
        ,paymentid			    BIGINT NOT NULL
        ,bookdate		    	DATETIME NOT NULL DEFAULT NOW()
        ,checkindate		    DATETIME NOT NULL DEFAULT NOW()
        ,checkoutdate		    DATETIME
        ,status                 BIGINT 
        ,isDelete				BOOL DEFAULT FALSE
        );
        
        CREATE TABLE QLKhachSan.Bookdetail (
		id			            BIGINT PRIMARY KEY AUTO_INCREMENT
        ,bookid				    BIGINT NOT NULL
        ,customerid				BIGINT NOT NULL
        ,status                 BIGINT 
        ,isDelete				BOOL DEFAULT FALSE
        );
        CREATE TABLE QLKhachSan.Roomservicedetail (
		id			            BIGINT PRIMARY KEY AUTO_INCREMENT
        ,bookid				    BIGINT NOT NULL
        ,serviceid				BIGINT NOT NULL
        ,quantity		        BIGINT DEFAULT 0
        ,status                 BIGINT 
        ,isDelete				BOOL DEFAULT FALSE
        );
        CREATE TABLE QLKhachSan.Status (
		id			            BIGINT PRIMARY KEY AUTO_INCREMENT
        ,name                   VARCHAR(50) NOT NULL
        ,isDelete				BOOL DEFAULT FALSE
        ,UNIQUE(name)
        );
        CREATE TABLE QLKhachSan.Gender (
		id			            BIGINT PRIMARY KEY AUTO_INCREMENT
        ,name                   VARCHAR(50) NOT NULL
        ,isDelete				BOOL DEFAULT FALSE
        ,UNIQUE(name)
        );
        CREATE TABLE QLKhachSan.CustomerType (
		id			            BIGINT PRIMARY KEY AUTO_INCREMENT
        ,name                   VARCHAR(50) NOT NULL
        ,isDelete				BOOL DEFAULT FALSE
        ,UNIQUE(name)
        );
        CREATE TABLE QLKhachSan.Payments (
		id			            BIGINT PRIMARY KEY AUTO_INCREMENT
        ,name                   VARCHAR(50) NOT NULL
        ,isDelete				BOOL DEFAULT FALSE
        ,UNIQUE(name)
        );


        

        
        
        
        