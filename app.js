const express = require("express");
const { connectToDb } = require("./database/connection");

const app = express();

connectToDb(() => {
  app.listen(3000, () => {
    console.log("app listening on port 3000");
  });
});
