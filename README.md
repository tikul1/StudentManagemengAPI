# StudentManagementAPI



## Technology

**_Nodejs_**

### FrameWork

**_ExpressJs_**

### Functionality

- [x] creating express app and Connecting to local mongoDB.
- [x] creating models with validation.
- [x] Teacher, student and superAdmin CRUD with validation.
- [x] authorization, password hashing and authentication.
- [x] single and multiple images uploading for students.
- [x] dockerizing for continous integration.
- [x] git version controlling.
- [x] creating reports of students.
- [x] implementing .env file for environment variables.
- [x] Connecting to mongoDB Cluster.
- [x] swagger documentation for documenting APIs.
- [x] Error handling.
- [x] Clustering and multithreading for dividing load of heavy processing.
- [x] testing
- [x] github actions for continous deployement.

### Database

- **_Mongodb_**: noSqL database
- **_JOI_**: For validation in models
- **_mongoose_**: ORM

### Image upload

**_Multer_**: for single and multiple image uploading.

### Authorization and Authentication

- **_passportJS_**: for authorization.
- **_JWT_**: json web tokens for authentication.
- **_Bcrypt_**: for password hashing.

### Documentation

**_Swagger_**: using YML file for APIs documentation

### Reports

**_excelJs_**: creating excel sheets for sutdents reports.

### Advance

**_clustering_** for **_multithreading_** to dividing load on application of heavy process.
and making application faster.

### Tools

- **_Nodemon_**: for continous app runtime
- **_Docker_**: for handling and delivering application faster
- **_git_**: for version controlling

### Testing

1.**_Postman_**

- For Api testing.
- Writing test cases in Postman for checking API's runtime, success status, input and output of data validation.

### How to run

- Clone repo and to install all dependencies Command: npm install
- create .env file and add PORT, DB_USERNAME and DB_PASSWORD (mongoDB cluster)
- to run in docker command: docker-compose up -d
- to run without docker command: npm start
