const mongoose = require("mongoose");

const mongoDBConnection = () => {
  /*------------- | MONGO DB CONNECTION STRING | ----------- */
  const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.curpv.mongodb.net/studenApi?retryWrites=true&w=majority`;
  /*------------- | MONGO DB CONNECTION | ----------- */
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, success) => {
    if (error) {
      console.log(`Error while database connection ${error}`);
    } else {
      console.log("Database connected.");
    }
  });
};
module.exports = mongoDBConnection;
