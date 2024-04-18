const  mongoose =  require("mongoose");

const connectDB = async () => {
 try {
  await mongoose
  .connect("mongodb://127.0.0.1:27017/mail_app_db")
  .then(() => {
    console.log("connection successful");
  })
  .catch((e) => {
    console.log("no connection");
  });
 } catch (error) {
  console.log(error)
 }
};

module.exports = connectDB;