# StudentManagementAPI

# Technology

***Nodejs***

# FrameWork

Express js FrameWork

# Functionality

Management of school in which Teacher, student and superAdmin(HOD or Principal) can login and add/remove/update as per their roles.
aslo while creating admin can assign roles and upload pictures with authorization and authentications of users.

# Database

Mongodb.
JOI: for validation in models/
connecting mongodb locally and using mongodb compass cluster.

# Image upload

Multer: for single and multiple image uploading.

# Authorization and Authentication

passportJS
JWT
Bcrypt for password hashing

# Documentation

Swagger using YML file for applications documentation

# Reports

excelJs: for creating excel sheets

# Advance

clustering for multithreading to divide load on application.
and making application 30% faster.

# Tools

Nodemon: for continous app runtime
Docker: for handling and delivering application faster

# Testing

Postman: 1) For Api testing. 2) Writing test cases in Postman for checking API's runtime, success status, input and output of data validation.

# How to run

1: Clone repo and to install all dependencies Command: npm install
2: create .env file and add PORT, DB_USERNAME and DB_PASSWORD (mongoDB cluster)
3: to run in docker command: docker-compose up -d
4: to run without docker command: npm start
