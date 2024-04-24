const app = require("./app.js");
const { connectToDb } = require("./database/connection");

const listen = () => {
  connectToDb().then(() => {
    app.listen(3000, () => {
      console.log("app listening on port 3000");
    });
  }).catch((err) => {
    console.log(err)
    throw err
  })
};

listen();
