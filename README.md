# quotes-mysql
### About
* Quotes Mysql project is designed to integrate both frontend and backend into one piece developed using next js and mysql server
* Simple login and registration with sha256 password encryption 
* You can copy or pull this code into your editor and make your own changes
* I will post some integration commands and codes to help you connect server and client
* This is just a simple project to understand and learn mysql server and connection of that to frontend

### Images
![main](https://user-images.githubusercontent.com/65218890/145153698-353e3679-db5f-4837-9f10-bf06dbf30567.PNG)

![login](https://user-images.githubusercontent.com/65218890/145154074-5df204a2-e28f-495d-8f58-a6a0b611ecc1.PNG)

### Installation
* Pull the server and client folders individually
* run <code>npm install</code> to fetch node modules in both folders

### MYSQL
* Install MySQL in your machine
* https://dev.mysql.com/downloads/installer/ select your machine
* Open MySQL command line client or Workbench
* I hope you have knowledge about SQL commands
* <code>
  create database quotesdb;
  </code>
* <code>use quotesdb;</code>
* <code>
  create table user (uid varchar(100) not null primary key, email varchar(45) not null unique, hash varchar(255) not null, salt varchar(255) not null);
  </code>
* <code> 
  create table quote (id int primary key auto_increment,quote varchar(255) unique not null,author varchar(40) not null, created_at datetime not null default current_timestamp,   updated_at datetime not null default current_timestamp on update current_timestamp,uid varchar(255), foreign key(uid) references user (uid));
  </code>
  
### Start
* To start the server run <code>npm start</code>
* To start the client run <code>npm run dev</code>
* Create a new user using client application and insert quotes using the user id uid from mysql command line client

### Issues
Ping me on 
  
