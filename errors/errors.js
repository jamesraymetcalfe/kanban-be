exports.handleInvalidEndpoints = (request, response, next) => {
  response.status(404).send({ msg: "path not found" });
};

exports.handleServerErrors = (err, request, response, next) => {
  response.status(500).send({ msg: "internal server error" });
};
