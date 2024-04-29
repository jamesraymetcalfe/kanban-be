const { connectToDb } = require("./connection");
const data = require("./data/development-data.json");
const { seed } = require("./seed");

const runSeed = () => {
  return connectToDb()
    .then(() => {
      return seed(data);
    })
    .then(() => {
      console.log("development data successfully seeded");
    })
    .catch((err) => {
      throw err;
    });
};

runSeed();
