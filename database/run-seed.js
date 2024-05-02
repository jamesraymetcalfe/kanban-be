const { connectToDb } = require("./connection");
const data = require("./data/development-data.json");
const { seed } = require("./seed");

const runSeed = () => {
  return connectToDb()
    .then(() => {
      return seed(data);
    })
    .catch((err) => {
      throw err;
    })
    .finally(() => {
      mongoose.disconnect();
    });
};

runSeed();
