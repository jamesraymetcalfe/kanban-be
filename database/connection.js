const mongoose = require("mongoose");
const ENV = process.env.NODE_ENV || "development";

require("dotenv").config({
  path: `${__dirname}/../.env.${ENV}`,
});

exports.connectToDb = () => {
  return mongoose
    .connect(process.env.MONGO_DATABASE_URI)
    .then(() => {
      console.log("connected to database");
    })
    .catch((error) => {
      console.log("connection failed", error);
      throw error;
    });
};
