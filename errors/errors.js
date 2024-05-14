exports.handleInvalidEndpoints = (request, response, next) => {
  response.status(404).send({ msg: "path not found" });
};

exports.handleCustomErrors = (err, request, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  }
  next(err);
};

exports.handleMongoErrors = (err, request, res, next) => {
  if (err.reason.code === "ERR_ASSERTION" || err.reason.toString().includes("BSONError:")) {
    res.status(400).send({ msg: "bad request" });
  }
  next(err);
};

exports.handleServerErrors = (err, request, response, next) => {
  response.status(500).send({ msg: "internal server error" });
};
